const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const createEnrollment = async (
  req,
  res
) => {
  try {
    const userId = req.user.id;

    const {
      courseId,
      paymentId,
      amount,
    } = req.body;

    const course =
      await Course.findById(
        courseId
      );

    if (!course) {
      return res.status(404).json({
        success: false,
        message:
          "Course not found",
      });
    }

    const alreadyEnrolled =
      await Enrollment.findOne({
        user: userId,
        course: courseId,
      });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message:
          "Course already purchased",
      });
    }

    const enrollment =
      await Enrollment.create({
        user: userId,
        course: courseId,
        paymentId,
        amount,
        status: "paid",
      });

    res.status(201).json({
      success: true,
      message:
        "Course purchased successfully",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const checkEnrollment =
  async (req, res) => {
    try {
      const userId =
        req.user.id;

      const { courseId } =
        req.params;

      const enrollment =
        await Enrollment.findOne({
          user: userId,
          course: courseId,
          status: "paid",
        });

      res.json({
        success: true,
        purchased:
          !!enrollment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  const getMyEnrollments =
  async (req, res) => {
    try {
      const enrollments =
        await Enrollment.find({
          user: req.user.id,
          status: "paid",
        }).populate(
          "course"
        );

      res.json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

  const getAllEnrollments =
  async (req, res) => {
    try {
      const enrollments =
        await Enrollment.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "course",
            "title"
          );

      res.json({
        success: true,
        data: enrollments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  const getMyCourses =
  async (req, res) => {
    try {
      const userId =
        req.user.id;

      const courses =
        await Enrollment.find({
          user: userId,
          status: "paid",
        })
          .populate(
            "course"
          )
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
  const getMyCourseDetails =
    async (req, res) => {
      try {
        const userId =
          req.user.id;
  
        const {
          courseId,
        } = req.params;
  
        const enrollment =
          await Enrollment.findOne({
            user: userId,
            course: courseId,
            status: "paid",
          }).populate(
            "course"
          );
  
        if (
          !enrollment
        ) {
          return res.status(403).json({
            success: false,
            message:
              "Course not purchased",
          });
        }
  
        res.json({
          success: true,
          data:
            enrollment.course,
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
  createEnrollment,
  checkEnrollment,
  getMyEnrollments,
  getAllEnrollments,
  getMyCourses,
  getMyCourseDetails
};