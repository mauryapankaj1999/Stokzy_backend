const Course = require("../models/Course");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const cloudinary = require("../config/cloudinary");
// Create Course
const createCourse = async (req, res) => {
  try {
    const {
      title,
      slug,
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
    } = req.body;

    // Check Slug
    const existingCourse = await Course.findOne({
      slug,
    });

    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "Course slug already exists",
      });
    }

    let thumbnail = "";
    let thumbnailPublicId = "";

    let videoFile = "";
    let videoPublicId = "";

    // ==========================
    // Upload Thumbnail
    // ==========================

    if (req.files?.thumbnail?.[0]) {
      const thumbnailUpload =
        await uploadToCloudinary(
          req.files.thumbnail[0].buffer,
          "courses",
          "image"
        );

      thumbnail =
        thumbnailUpload.secure_url;

      thumbnailPublicId =
        thumbnailUpload.public_id;
    }

    // ==========================
    // Upload Video
    // ==========================

    if (
      videoType === "upload" &&
      req.files?.videoFile?.[0]
    ) {
      const videoUpload =
        await uploadToCloudinary(
          req.files.videoFile[0].buffer,
          "videos",
          "video"
        );

      videoFile =
        videoUpload.secure_url;

      videoPublicId =
        videoUpload.public_id;
    }

    // ==========================
    // Create Course
    // ==========================

    const course =
      await Course.create({
        title,
        slug,

        thumbnail,
        thumbnailPublicId,

        shortDescription,
        description,
        category,

        price,
        discountPrice,

        duration,
        level,
        status,

        videoType,

        videoUrl:
          videoType === "url"
            ? videoUrl
            : "",

        videoFile,

        videoPublicId,
      });

    res.status(201).json({
      success: true,
      message:
        "Course created successfully",
      data: course,
    });
  } catch (error) {
   console.error("========== CREATE COURSE ERROR ==========");
  console.error(error);
  console.error(error.message);
  console.error(error.stack);

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
// const updateCourse = async (
//   req,
//   res
// ) => {
//   try {
//     const { id } = req.params;

//     const course =
//       await Course.findById(id);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Delete old thumbnail
//     if (
//       req.files?.thumbnail?.[0] &&
//       course.thumbnail
//     ) {
//       const publicId =
//         course.thumbnail
//           .split("/")
//           .slice(-2)
//           .join("/")
//           .split(".")[0];

//       await cloudinary.uploader.destroy(
//         publicId
//       );

//       const thumbnailUpload =
//         await uploadToCloudinary(
//           req.files.thumbnail[0]
//             .buffer,
//           "courses",
//           "image"
//         );

//       req.body.thumbnail =
//         thumbnailUpload.secure_url;
//     }

//     // Delete old video
//     if (
//       req.files?.videoFile?.[0] &&
//       course.videoFile
//     ) {
//       const publicId =
//         course.videoFile
//           .split("/")
//           .slice(-2)
//           .join("/")
//           .split(".")[0];

//       await cloudinary.uploader.destroy(
//         publicId,
//         {
//           resource_type:
//             "video",
//         }
//       );

//       const videoUpload =
//         await uploadToCloudinary(
//           req.files.videoFile[0]
//             .buffer,
//           "videos",
//           "video"
//         );

//       req.body.videoFile =
//         videoUpload.secure_url;
//     }

//     const updatedCourse =
//       await Course.findByIdAndUpdate(
//         id,
//         req.body,
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//     res.status(200).json({
//       success: true,
//       message:
//         "Course updated successfully",
//       data: updatedCourse,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    // ==========================
    // Update Thumbnail
    // ==========================

    if (req.files?.thumbnail?.[0]) {
      // Delete old thumbnail
      if (course.thumbnailPublicId) {
        await cloudinary.uploader.destroy(
          course.thumbnailPublicId
        );
      }

      const thumbnailUpload =
        await uploadToCloudinary(
          req.files.thumbnail[0].buffer,
          "courses",
          "image"
        );

      updateData.thumbnail =
        thumbnailUpload.secure_url;

      updateData.thumbnailPublicId =
        thumbnailUpload.public_id;
    }

    // ==========================
    // Upload New Video
    // ==========================

    if (
      updateData.videoType === "upload" &&
      req.files?.videoFile?.[0]
    ) {
      // Delete old uploaded video
      if (course.videoPublicId) {
        await cloudinary.uploader.destroy(
          course.videoPublicId,
          {
            resource_type: "video",
          }
        );
      }

      const videoUpload =
        await uploadToCloudinary(
          req.files.videoFile[0].buffer,
          "videos",
          "video"
        );

      updateData.videoFile =
        videoUpload.secure_url;

      updateData.videoPublicId =
        videoUpload.public_id;

      // Clear URL because upload mode is selected
      updateData.videoUrl = "";
    }

    // ==========================
    // Switch Upload -> URL
    // ==========================

    if (updateData.videoType === "url") {
      // Delete uploaded video
      if (course.videoPublicId) {
        await cloudinary.uploader.destroy(
          course.videoPublicId,
          {
            resource_type: "video",
          }
        );
      }

      updateData.videoFile = "";
      updateData.videoPublicId = "";
    }

    // ==========================
    // Update Course
    // ==========================

    const updatedCourse =
      await Course.findByIdAndUpdate(
        id,
        updateData,
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
    console.log(error);

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