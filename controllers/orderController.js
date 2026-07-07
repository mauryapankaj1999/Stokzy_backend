const Razorpay = require("razorpay");
const User = require("../models/User");
const Order = require("../models/Order");
const Enrollment = require("../models/Enrollment");
const sendEmail = require("../utils/sendEmail");
const purchaseTemplate = require("../utils/templates/purchaseTemplate");
const { generateInvoiceBuffer } = require("./invoiceController");
const Course = require("../models/Course");

// console.log("KEY =>", process.env.RAZORPAY_KEY_ID);

// console.log("SECRET =>", process.env.RAZORPAY_KEY_SECRET);
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order
const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    const order = await Order.create({
      user: req.user.id,
      course: course._id,
      amount: course.price,
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      success: true,
      data: {
        order,
        razorpayOrder,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify Payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const crypto = require("crypto");

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid Signature",
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "paid";
    order.paymentId = razorpay_payment_id;

    await order.save();

    const exists = await Enrollment.findOne({
      user: order.user,
      course: order.course,
    });

    if (!exists) {
      await Enrollment.create({
        user: order.user,
        course: order.course,
        paymentId: razorpay_payment_id,
        amount: order.amount,
        status: "paid",
      });
    }

    const user = await User.findById(order.user);

    // Get course details
    const course = await Course.findById(order.course);

    // Populate order
    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email mobile")
      .populate("course", "title");

    // Generate PDF Buffer
    const pdfBuffer = await generateInvoiceBuffer(populatedOrder);

    // Send Email
    await sendEmail({
      to: user.email,

      subject: "Course Purchase Successful",

      html: purchaseTemplate({
        name: user.name,

        courseName: course.title,

        amount: order.amount,

        paymentId: order.paymentId,

        orderId: order.razorpayOrderId,

        purchaseDate: new Date(order.createdAt).toLocaleDateString("en-IN"),
      }),

      attachments: [
        {
          filename: `Invoice-${order._id}.pdf`,

          content: pdfBuffer,
        },
      ],
    });

    res.json({
      success: true,
      message: "Payment Verified",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("course", "title thumbnail")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  getMyOrders,
};
