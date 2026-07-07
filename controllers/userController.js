const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
// const User = require("../models/User");
const Order = require("../models/Order");

const registerUser = async (req,res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        name,
        email,
        mobile,
        password:
          hashedPassword,
      });

    res.status(201).json({
      success: true,
      message:
        "User Registered Successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};


const loginUser = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password are required",
      });
    }

    console.log(
      "Email From Frontend =>",
      email
    );

    const user =
      await User.findOne({
        email,
      });

    console.log(
      "Collection =>",
      User.collection.name
    );
    console.log(
      "User =>",
      user
    );

    // User Not Found
    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Email",
      });
    }

    // Check Account Status
    if (
      user.status ===
      "inactive"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Account Deactivated",
      });
    }

    // Password Match
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid Password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email:
          user.email,
        mobile:
          user.mobile,
        role: user.role,
        status:
          user.status,
      },
    });
  } catch (error) {
    console.log(
      "Login Error =>",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Server Error",
    });
  }
};

const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    const usersWithCourses =
      await Promise.all(
        users.map(async (user) => {
          const courseCount =
            await Enrollment.countDocuments({
              user: user._id,
              status: "paid",
            });

          return {
            ...user.toObject(),
            purchasedCourses:
              courseCount,
          };
        })
      );

    res.status(200).json({
      success: true,
      data: usersWithCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          mobile:
            req.body.mobile,
          role: req.body.role,
          status:
            req.body.status,
        },
        {
          new: true,
        }
      );

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const deleteUser = async (
  req,
  res
) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      {
        status:
          "inactive",
      }
    );

    res.json({
      success: true,
      message:
        "User Deactivated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.json({
      success: true,
      message:
        "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          name: req.body.name,
          mobile: req.body.mobile,
        },
        {
          new: true,
        }
      ).select("-password");

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // User Details
    const user = await User.findById(userId).select(
      "name email"
    );

    // Purchased Courses
    const purchasedCourses = await Enrollment.countDocuments({
      user: userId,
      status: "paid",
    });

    // Completed Courses
    const completedCourses = await Enrollment.countDocuments({
      user: userId,
      status: "completed",
    });

    // Pending Courses
    const pendingCourses =
      purchasedCourses - completedCourses;

    // My Courses
    const myCourses = await Enrollment.find({
      user: userId,
      status: "paid",
    })
      .populate(
        "course",
        "title thumbnail price discountPrice duration level"
      )
      .sort({
        createdAt: -1,
      });

    // Recent Orders
    const recentOrders = await Order.find({
      user: userId,
      status: "paid",
    })
      .populate(
        "course",
        "title"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.json({
      success: true,
      data: {
        user,
        cards: {
          purchasedCourses,
          completedCourses,
          pendingCourses,
        },
        myCourses,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserPurchaseDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // User Details
    const user = await User.findById(userId).select(
      "name email status createdAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User Orders
    const orders = await Order.find({
      user: userId,
      status: "paid",
    })
      .populate(
        "course",
        "title thumbnail price discountPrice duration level"
      )
      .sort({
        createdAt: -1,
      });

    // Summary
    const totalOrders = orders.length;

    const totalCourses = orders.length;

    const totalSpent = orders.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const purchases = orders.map((item) => ({
      orderId: item._id,
      courseTitle: item.course?.title,
      thumbnail: item.course?.thumbnail,
      price: item.course?.price,
      discountPrice: item.course?.discountPrice,
      duration: item.course?.duration,
      level: item.course?.level,
      amount: item.amount,
      paymentId: item.paymentId,
      razorpayOrderId: item.razorpayOrderId,
      status: item.status,
      purchaseDate: item.createdAt,
    }));

    res.json({
      success: true,
      data: {
        user,
        summary: {
          totalOrders,
          totalCourses,
          totalSpent,
        },
        purchases,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
  updateProfile,
  getUserDashboard,
  getUserPurchaseDetails,
};