const CourseModule = require("../models/CourseModule");
const CourseLesson = require("../models/CourseLesson");
const createModule =
  async (req, res) => {
    try {
      const module =
        await CourseModule.create(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Module created successfully",
        data: module,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const getModulesByCourse = async (req, res) => {
  try {
    const modules = await CourseModule.find({
      course: req.params.courseId,
    }).sort({
      order: 1,
    });

    const modulesWithLessons =
      await Promise.all(
        modules.map(
          async (module) => {
            const lessons =
              await CourseLesson.find({
                module:
                  module._id,
                status:
                  "active",
              }).sort({
                order: 1,
              });

            return {
              ...module.toObject(),
              lessons,
            };
          }
        )
      );

    res.status(200).json({
      success: true,
      data: modulesWithLessons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateModule =
  async (req, res) => {
    try {
      const module =
        await CourseModule.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Module updated successfully",
        data: module,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

const deleteModule =
  async (req, res) => {
    try {
      await CourseModule.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Module deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
  const getSingleModule = async (
  req,
  res
) => {
  try {
    const module =
      await CourseModule.findById(
        req.params.id
      );

    res.json({
      success: true,
      data: module,
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
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule,
  getSingleModule,
};