const User = require("../models/User");
const Course = require("../models/Course");
const CourseModule = require("../models/CourseModule");
const CourseLesson = require("../models/CourseLesson");
const Enrollment = require("../models/Enrollment");
const Blog = require("../models/Blog");

const getDashboardStats = async (
  req,
  res
) => {
  try {
    const totalUsers =
      await User.countDocuments();

      const totalBlogs =
      await Blog.countDocuments();


    const totalCourses =
      await Course.countDocuments();

    const totalModules =
      await CourseModule.countDocuments();

    const totalLessons =
      await CourseLesson.countDocuments();

    const totalEnrollments =
      await Enrollment.countDocuments();

    const revenueData =
      await Enrollment.aggregate([
        {
          $match: {
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData[0]
        ?.totalRevenue || 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalModules,
        totalLessons,
        totalEnrollments,
        totalRevenue,
        totalBlogs,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};