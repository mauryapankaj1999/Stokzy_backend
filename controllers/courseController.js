const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
  try {
    const {
      title,
      slug,
      // thumbnail,
      shortDescription,
      description,
       category,
      price,
      discountPrice,
      duration,
      level,
      status,
      videoType,
      videoUrl,
      videoFile,
    } = req.body;

    const thumbnail = req.file
  ? `/uploads/courses/${req.file.filename}`
  : "";


    const existingCourse = await Course.findOne({
      slug,
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message:
          "Course slug already exists",
      });
    }

    const course = await Course.create({
      title,
      slug,
      thumbnail,
      shortDescription,
      description,
      category,
      price,
      discountPrice,
      duration,
      level,
      status,
      videoType,
      videoUrl,
      videoFile,
    });

    res.status(201).json({
      success: true,
      message:
        "Course created successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Courses
const getCourses = async (req, res) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const {
      category,
      search,
    } = req.query;

    let filter = {};

    // Category Filter
    if (category) {
      filter.category =
        category;
    }

    // Search Filter
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const totalCourses =
      await Course.countDocuments(
        filter
      );

    const courses =
      await Course.find(filter)
        .populate(
          "category",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
      success: true,
      count: courses.length,
      totalCourses,
      totalPages: Math.ceil(
        totalCourses / limit
      ),
      currentPage: page,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Course
const getSingleCourse =
  async (req, res) => {
    try {
      const { id } = req.params;

      const course =
        await Course.findById(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message:
            "Course not found",
        });
      }

      res.status(200).json({
        success: true,
        data: course,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// Update Course
const updateCourse = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const course =
      await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message:
          "Course not found",
      });
    }

    const updatedCourse =
      await Course.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Course
const deleteCourse = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const course =
      await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message:
          "Course not found",
      });
    }

    await Course.findByIdAndDelete(
      id
    );

    res.status(200).json({
      success: true,
      message:
        "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseBySlug = async (
  req,
  res
) => {
  try {
    const course =
      await Course.findOne({
        slug: req.params.slug,
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleLesson =
  async (req, res) => {
    try {
      const lesson =
        await CourseLesson.findById(
          req.params.id
        );

      res.json({
        success: true,
        data: lesson,
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
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
  getSingleLesson,
};