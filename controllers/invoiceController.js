// const PDFDocument = require("pdfkit");
// const Order = require("../models/Order");

// const downloadInvoice = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId)
//       .populate("user", "name email")
//       .populate("course", "title");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     // Security
//     if (order.user._id.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     res.setHeader(
//       "Content-Type",
//       "application/pdf"
//     );

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=invoice-${order._id}.pdf`
//     );

//     const doc = new PDFDocument({
//       margin: 50,
//     });

//     doc.pipe(res);

//     // Heading
//     doc
//       .fontSize(24)
//       .fillColor("#16a34a")
//       .text("STOKZY", {
//         align: "center",
//       });

//     doc.moveDown();

//     doc
//       .fontSize(20)
//       .fillColor("black")
//       .text("Invoice", {
//         align: "center",
//       });

//     doc.moveDown(2);

//     doc.fontSize(12);

//     doc.text(`Invoice No : INV-${order._id}`);

//     doc.text(`Order ID : ${order.razorpayOrderId}`);

//     doc.text(
//       `Payment ID : ${
//         order.paymentId || "-"
//       }`
//     );

//     doc.moveDown();

//     doc.text(
//       `Customer : ${order.user.name}`
//     );

//     doc.text(
//       `Email : ${order.user.email}`
//     );

//     doc.moveDown();

//     doc.text(
//       `Course : ${order.course.title}`
//     );

//     doc.text(
//       `Amount : ₹${order.amount}`
//     );

//     doc.text(
//       `Status : ${order.status}`
//     );

//     doc.text(
//       `Purchase Date : ${new Date(
//         order.createdAt
//       ).toLocaleDateString("en-IN")}`
//     );

//     doc.moveDown(3);

//     doc
//       .fontSize(14)
//       .fillColor("#16a34a")
//       .text(
//         "Thank you for purchasing from STOKZY.",
//         {
//           align: "center",
//         }
//       );

//     doc.end();
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   downloadInvoice,
// };


// const PDFDocument = require("pdfkit");
// const Order = require("../models/Order");

// const downloadInvoice = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId)
//       .populate("user", "name email")
//       .populate("course", "title");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",
//       });
//     }

//     if (order.user._id.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     res.setHeader("Content-Type", "application/pdf");

//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=Invoice-${order._id}.pdf`
//     );

//     const doc = new PDFDocument({
//       size: "A4",
//       margin: 50,
//     });

//     doc.pipe(res);

//     // ================= HEADER =================

//     doc
//       .rect(0, 0, 595, 90)
//       .fill("#16a34a");

//     doc
//       .fillColor("white")
//       .fontSize(28)
//       .font("Helvetica-Bold")
//       .text("STOKZY", 50, 30);

//     doc
//       .fontSize(12)
//       .font("Helvetica")
//       .text("Payment Invoice", 50, 62);

//     // Invoice Title

//     doc
//       .fillColor("#000")
//       .fontSize(22)
//       .font("Helvetica-Bold")
//       .text("INVOICE", 400, 40);

//     let y = 120;

//     // ================= Invoice Info =================

//     doc
//       .fontSize(12)
//       .font("Helvetica-Bold")
//       .fillColor("#16a34a")
//       .text("Invoice Details", 50, y);

//     y += 25;

//     doc
//       .strokeColor("#cccccc")
//       .moveTo(50, y)
//       .lineTo(545, y)
//       .stroke();

//     y += 15;

//     doc
//       .fillColor("#000")
//       .font("Helvetica")
//       .text(`Invoice No`, 50, y)
//       .text(`INV-${order._id.toString().slice(-8)}`, 180, y);

//     y += 20;

//     doc
//       .text(`Order ID`, 50, y)
//       .text(order.razorpayOrderId, 180, y);

//     y += 20;

//     doc
//       .text(`Payment ID`, 50, y)
//       .text(order.paymentId || "-", 180, y);

//     y += 20;

//     doc
//       .text(`Invoice Date`, 50, y)
//       .text(
//         new Date(order.createdAt).toLocaleDateString("en-IN"),
//         180,
//         y
//       );

//     // ================= BILL TO =================

//     y += 50;

//     doc
//       .roundedRect(50, y, 495, 90, 5)
//       .fill("#f5f5f5");

//     doc
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .fontSize(14)
//       .text("BILL TO", 65, y + 12);

//     doc
//       .fillColor("#000")
//       .font("Helvetica")
//       .fontSize(12)
//       .text(`Customer : ${order.user.name}`, 65, y + 38);

//     doc.text(
//       `Email : ${order.user.email}`,
//       65,
//       y + 58
//     );

//     // ================= COURSE TABLE =================

//     y += 130;

//     doc
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .fontSize(14)
//       .text("COURSE DETAILS", 50, y);

//     y += 25;

//     doc
//       .rect(50, y, 495, 28)
//       .fill("#16a34a");

//     doc
//       .fillColor("white")
//       .fontSize(11)
//       .text("Course", 60, y + 8);

//     doc.text("Amount", 420, y + 8);

//     y += 28;

//     doc
//       .rect(50, y, 495, 35)
//       .stroke("#d9d9d9");

//     doc
//       .fillColor("#000")
//       .font("Helvetica")
//       .text(order.course.title, 60, y + 10, {
//         width: 320,
//       });

//     doc.text(`₹${order.amount}`, 430, y + 10);

//     // ================= PAYMENT =================

//     y += 60;

//     doc
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .fontSize(14)
//       .text("PAYMENT DETAILS", 50, y);

//     y += 25;

//     doc
//       .fontSize(12)
//       .fillColor("#000")
//       .font("Helvetica")
//       .text("Status :", 50, y);

//     doc
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .text(order.status.toUpperCase(), 130, y);

//     y += 22;

//     doc
//       .fillColor("#000")
//       .font("Helvetica")
//       .text("Payment Method :", 50, y);

//     doc.text("Razorpay", 170, y);

//     y += 35;

//     // ================= TOTAL =================

//     doc
//       .moveTo(50, y)
//       .lineTo(545, y)
//       .stroke("#cccccc");

//     y += 20;

//     doc
//       .fontSize(16)
//       .font("Helvetica-Bold")
//       .text("TOTAL PAID", 320, y);

//     doc
//       .fillColor("#16a34a")
//       .text(`₹${order.amount}`, 460, y);

//     // ================= FOOTER =================

//     y += 70;

//     doc
//       .moveTo(50, y)
//       .lineTo(545, y)
//       .stroke("#cccccc");

//     y += 25;

//     doc
//       .fontSize(16)
//       .fillColor("#16a34a")
//       .font("Helvetica-Bold")
//       .text(
//         "Thank you for purchasing from STOKZY!",
//         {
//           align: "center",
//         }
//       );

//     y += 30;

//     doc
//       .fontSize(10)
//       .fillColor("#666")
//       .font("Helvetica")
//       .text(
//         "Website : www.stokzy.com",
//         {
//           align: "center",
//         }
//       );

//     doc.text(
//       "Email : support@stokzy.com",
//       {
//         align: "center",
//       }
//     );

//     doc.end();
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   downloadInvoice,
// };
// const PDFDocument = require("pdfkit");
// const Order = require("../models/Order");

// const downloadInvoice = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId)
//       .populate("user", "name email, mobile ")
//       .populate("course", "title");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order not found",

//       });

//     }

//     if (order.user._id.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename=Invoice-${order._id}.pdf`
//     );

//     const doc = new PDFDocument({
//       size: "A4",
//       margin: 50,
//     });

//     doc.pipe(res);

//     // ================= COLORS =================
//     const dark = "#1a1a1a";
//     const gray = "#6b7280";
//     const lightGray = "#f4f4f5";
//     const border = "#e2e2e2";
//     const accent = "#2c2c2c"; // used only for headings/lines, not big blocks

//     const pageWidth = 595;
//     const marginX = 50;
//     const contentWidth = pageWidth - marginX * 2;

//     // ================= HEADER =================

//     doc
//       .fillColor(dark)
//       .fontSize(24)
//       .font("Helvetica-Bold")
//       .text("STOKZY", marginX, 45);

//     doc
//       .fontSize(9)
//       .font("Helvetica")
//       .fillColor(gray)
//       .text("www.stokzy.com  |  support@stokzy.com", marginX, 74);

//     doc
//       .fillColor(dark)
//       .fontSize(20)
//       .font("Helvetica-Bold")
//       .text("INVOICE", 350, 45, { width: 195, align: "right" });

//     doc
//       .fontSize(10)
//       .font("Helvetica")
//       .fillColor(gray)
//       .text(`INV-${order._id.toString().slice(-8).toUpperCase()}`, 350, 72, {
//         width: 195,
//         align: "right",
//       });

//     let y = 110;

//     doc
//       .moveTo(marginX, y)
//       .lineTo(marginX + contentWidth, y)
//       .strokeColor(dark)
//       .lineWidth(1.5)
//       .stroke();

//     y += 25;

//     // ================= INVOICE INFO (2 columns) =================

//     const labelColor = gray;
//     const valueColor = dark;

//     const infoLeftX = marginX;
//     const infoRightX = 320;

//     doc.fontSize(9).font("Helvetica-Bold").fillColor(labelColor);
//     doc.text("ORDER ID", infoLeftX, y);
//     doc.text("PAYMENT ID", infoRightX, y);

//     y += 14;

//     doc.fontSize(10).font("Helvetica").fillColor(valueColor);
//     doc.text(order.razorpayOrderId || "-", infoLeftX, y, { width: 250 });
//     doc.text(order.paymentId || "-", infoRightX, y, { width: 220 });

//     y += 26;

//     doc.fontSize(9).font("Helvetica-Bold").fillColor(labelColor);
//     doc.text("INVOICE DATE", infoLeftX, y);
//     doc.text("STATUS", infoRightX, y);

//     y += 14;

//     doc
//       .fontSize(10)
//       .font("Helvetica")
//       .fillColor(valueColor)
//       .text(new Date(order.createdAt).toLocaleDateString("en-IN"), infoLeftX, y);

//     doc
//       .font("Helvetica-Bold")
//       .fillColor(dark)
//       .text(String(order.status || "-").toUpperCase(), infoRightX, y);

//     y += 35;

//     // ================= BILL TO =================

//     doc
//       .rect(marginX, y, contentWidth, 70)
//       .fill(lightGray);

//     doc
//       .fillColor(gray)
//       .font("Helvetica-Bold")
//       .fontSize(9)
//       .text("BILL TO", marginX + 15, y + 12);

//     doc
//       .fillColor(dark)
//       .font("Helvetica-Bold")
//       .fontSize(11)
//       .text(order.user.name, marginX + 15, y + 30);

//     doc
//       .fillColor(gray)
//       .font("Helvetica")
//       .fontSize(10)
//       .text(order.user.email, marginX + 15, y + 47);

//        doc
//       .fillColor(gray)
//       .font("Helvetica")
//       .fontSize(10)
//       .text(order.user.mobile, marginX + 15, y + 47);

//     y += 100;

//     // ================= COURSE TABLE =================

//     doc
//       .fillColor(dark)
//       .font("Helvetica-Bold")
//       .fontSize(11)
//       .text("COURSE DETAILS", marginX, y);

//     y += 20;

//     // table header
//     doc
//       .rect(marginX, y, contentWidth, 26)
//       .fill(dark);

//     doc
//       .fillColor("white")
//       .fontSize(10)
//       .font("Helvetica-Bold")
//       .text("COURSE", marginX + 12, y + 8);

//     doc.text("AMOUNT", marginX + contentWidth - 100, y + 8, {
//       width: 88,
//       align: "right",
//     });

//     y += 26;

//     const rowHeight = 40;

//     doc
//       .rect(marginX, y, contentWidth, rowHeight)
//       .strokeColor(border)
//       .lineWidth(1)
//       .stroke();

//     doc
//       .fillColor(dark)
//       .font("Helvetica")
//       .fontSize(10)
//       .text(order.course.title, marginX + 12, y + 13, {
//         width: contentWidth - 140,
//       });

//     doc
//       .font("Helvetica-Bold")
//       .text(`Rs. ${order.amount}`, marginX + contentWidth - 100, y + 13, {
//         width: 88,
//         align: "right",
//       });

//     y += rowHeight + 20;

//     // ================= PAYMENT METHOD =================

//     doc
//       .fontSize(9)
//       .font("Helvetica-Bold")
//       .fillColor(gray)
//       .text("PAYMENT METHOD", marginX, y);

//     doc
//       .fontSize(10)
//       .font("Helvetica")
//       .fillColor(dark)
//       .text("Razorpay", marginX, y + 14);

//     y += 45;

//     // ================= TOTAL =================

//     doc
//       .moveTo(marginX, y)
//       .lineTo(marginX + contentWidth, y)
//       .strokeColor(border)
//       .lineWidth(1)
//       .stroke();

//     y += 18;

//     doc
//       .fontSize(9)
//       .font("Helvetica")
//       .fillColor(gray)
//       .text("TOTAL PAID", marginX, y, { width: contentWidth - 100 });

//     doc
//       .fontSize(16)
//       .font("Helvetica-Bold")
//       .fillColor(dark)
//       .text(`Rs. ${order.amount}`, marginX + contentWidth - 150, y - 4, {
//         width: 150,
//         align: "right",
//       });

//     y += 40;

//     doc
//       .moveTo(marginX, y)
//       .lineTo(marginX + contentWidth, y)
//       .strokeColor(border)
//       .lineWidth(1)
//       .stroke();

//     // ================= FOOTER =================

//     y += 30;

//     doc
//       .fontSize(12)
//       .font("Helvetica-Bold")
//       .fillColor(dark)
//       .text("Thank you for purchasing from STOKZY!", marginX, y, {
//         width: contentWidth,
//         align: "center",
//       });

//     y += 22;

//     doc
//       .fontSize(9)
//       .font("Helvetica")
//       .fillColor(gray)
//       .text("This is a system generated invoice and does not require a signature.", marginX, y, {
//         width: contentWidth,
//         align: "center",
//       });

//     y += 30;

//     doc
//       .fontSize(8)
//       .fillColor(gray)
//       .text("Website: www.stokzy.com   |   Email: support@stokzy.com", marginX, y, {
//         width: contentWidth,
//         align: "center",
//       });

//     doc.end();
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,



//       message: error.message,
//     });
//   }
// };

// module.exports = {
//   downloadInvoice,
// };


const PDFDocument = require("pdfkit");
const Order = require("../models/Order");
const { PassThrough } = require("stream");



const generateInvoiceBuffer = async (order) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    const stream = new PassThrough();

    const chunks = [];

    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    stream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on("error", reject);

    doc.pipe(stream);



    doc
      .fontSize(24)
      .fillColor("#16a34a")
      .text("STOKZY", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fillColor("black")
      .fontSize(18)
      .text("Invoice", {
        align: "center",
      });

    doc.moveDown(2);

    doc.fontSize(12);

    doc.text(
      `Invoice No : INV-${order._id}`
    );

    doc.text(
      `Order ID : ${order.razorpayOrderId}`
    );

    doc.text(
      `Payment ID : ${order.paymentId}`
    );

    doc.moveDown();

    doc.text(
      `Customer : ${order.user.name}`
    );

    doc.text(
      `Email : ${order.user.email}`
    );

    doc.moveDown();

    doc.text(
      `Course : ${order.course.title}`
    );

    doc.text(
      `Amount : ₹${order.amount}`
    );

    doc.text(
      `Status : ${order.status}`
    );

    doc.text(
      `Purchase Date : ${new Date(
        order.createdAt
      ).toLocaleDateString("en-IN")}`
    );

    doc.moveDown(3);

    doc.text(
      "Thank you for purchasing from STOKZY.",
      {
        align: "center",
      }
    );

    doc.end();
  });
};


const downloadInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("user", "name email mobile")
      .populate("course", "title");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${order._id}.pdf`
    );

    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    doc.pipe(res);

    // ================= COLORS =================
    const dark = "#1a1a1a";
    const gray = "#6b7280";
    const lightGray = "#f4f4f5";
    const border = "#e2e2e2";

    const pageWidth = 595;
    const marginX = 50;
    const contentWidth = pageWidth - marginX * 2;

    // ================= HEADER =================

    doc
      .fillColor(dark)
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("STOKZY", marginX, 45);

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(gray)
      .text("www.stokzy.com  |  support@stokzy.com", marginX, 74);

    doc
      .fillColor(dark)
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("INVOICE", 350, 45, { width: 195, align: "right" });

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(gray)
      .text(`INV-${order._id.toString().slice(-8).toUpperCase()}`, 350, 72, {
        width: 195,
        align: "right",
      });

    let y = 110;

    doc
      .moveTo(marginX, y)
      .lineTo(marginX + contentWidth, y)
      .strokeColor(dark)
      .lineWidth(1.5)
      .stroke();

    y += 25;

    // ================= INVOICE INFO (2 columns) =================

    const labelColor = gray;
    const valueColor = dark;

    const infoLeftX = marginX;
    const infoRightX = 320;

    doc.fontSize(9).font("Helvetica-Bold").fillColor(labelColor);
    doc.text("ORDER ID", infoLeftX, y);
    doc.text("PAYMENT ID", infoRightX, y);

    y += 14;

    doc.fontSize(10).font("Helvetica").fillColor(valueColor);
    doc.text(order.razorpayOrderId || "-", infoLeftX, y, { width: 250 });
    doc.text(order.paymentId || "-", infoRightX, y, { width: 220 });

    y += 26;

    doc.fontSize(9).font("Helvetica-Bold").fillColor(labelColor);
    doc.text("INVOICE DATE", infoLeftX, y);
    doc.text("STATUS", infoRightX, y);

    y += 14;

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(valueColor)
      .text(new Date(order.createdAt).toLocaleDateString("en-IN"), infoLeftX, y);

    doc
      .font("Helvetica-Bold")
      .fillColor(dark)
      .text(String(order.status || "-").toUpperCase(), infoRightX, y);

    y += 35;

    // ================= BILL TO =================

    const billBoxHeight = 90;

    doc
      .rect(marginX, y, contentWidth, billBoxHeight)
      .fill(lightGray);

    doc
      .fillColor(gray)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("BILL TO", marginX + 15, y + 12);

    const billLabelX = marginX + 15;
    const billValueX = marginX + 90;
    let billY = y + 32;

    // Name
    doc
      .fillColor(gray)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Name", billLabelX, billY);

    doc
      .fillColor(dark)
      .font("Helvetica-Bold")
      .fontSize(10)
      .text(order.user.name || "-", billValueX, billY, { width: 350 });

    billY += 18;

    // Email
    doc
      .fillColor(gray)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Email", billLabelX, billY);

    doc
      .fillColor(dark)
      .font("Helvetica")
      .fontSize(10)
      .text(order.user.email || "-", billValueX, billY, { width: 350 });

    billY += 18;

    // Mobile
    doc
      .fillColor(gray)
      .font("Helvetica-Bold")
      .fontSize(9)
      .text("Mobile", billLabelX, billY);

    doc
      .fillColor(dark)
      .font("Helvetica")
      .fontSize(10)
      .text(order.user.mobile || "-", billValueX, billY, { width: 350 });

    y += billBoxHeight + 20;

    // ================= COURSE TABLE =================

    doc
      .fillColor(dark)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("COURSE DETAILS", marginX, y);

    y += 20;

    // table header
    doc
      .rect(marginX, y, contentWidth, 26)
      .fill(dark);

    doc
      .fillColor("white")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("COURSE", marginX + 12, y + 8);

    doc.text("AMOUNT", marginX + contentWidth - 100, y + 8, {
      width: 88,
      align: "right",
    });

    y += 26;

    const rowHeight = 40;

    doc
      .rect(marginX, y, contentWidth, rowHeight)
      .strokeColor(border)
      .lineWidth(1)
      .stroke();

    doc
      .fillColor(dark)
      .font("Helvetica")
      .fontSize(10)
      .text(order.course.title, marginX + 12, y + 13, {
        width: contentWidth - 140,
      });

    doc
      .font("Helvetica-Bold")
      .text(`Rs. ${order.amount}`, marginX + contentWidth - 100, y + 13, {
        width: 88,
        align: "right",
      });

    y += rowHeight + 20;

    // ================= PAYMENT METHOD =================

    doc
      .fontSize(9)
      .font("Helvetica-Bold")
      .fillColor(gray)
      .text("PAYMENT METHOD", marginX, y);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor(dark)
      .text("Razorpay", marginX, y + 14);

    y += 45;

    // ================= TOTAL =================

    doc
      .moveTo(marginX, y)
      .lineTo(marginX + contentWidth, y)
      .strokeColor(border)
      .lineWidth(1)
      .stroke();

    y += 18;

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(gray)
      .text("TOTAL PAID", marginX, y, { width: contentWidth - 100 });

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor(dark)
      .text(`Rs. ${order.amount}`, marginX + contentWidth - 150, y - 4, {
        width: 150,
        align: "right",
      });

    y += 40;

    doc
      .moveTo(marginX, y)
      .lineTo(marginX + contentWidth, y)
      .strokeColor(border)
      .lineWidth(1)
      .stroke();

    // ================= FOOTER =================

    y += 30;

    doc
      .fontSize(12)
      .font("Helvetica-Bold")
      .fillColor(dark)
      .text("Thank you for purchasing from STOKZY!", marginX, y, {
        width: contentWidth,
        align: "center",
      });

    y += 22;

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(gray)
      .text("This is a system generated invoice and does not require a signature.", marginX, y, {
        width: contentWidth,
        align: "center",
      });

    y += 30;

    doc
      .fontSize(8)
      .fillColor(gray)
      .text("Website: www.stokzy.com   |   Email: support@stokzy.com", marginX, y, {
        width: contentWidth,
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  downloadInvoice,
  generateInvoiceBuffer,
};
