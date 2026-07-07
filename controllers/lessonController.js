const CourseLesson = require("../models/CourseLesson");


// Create Lesson
const createLesson =
  async (req, res) => {
      console.log("BODY =>", req.body);
    console.log("FILES =>", req.files);
    try {

      let videos = [];
      let pdfs = [];

      // Uploaded Videos
      if (
        req.files &&
        req.files.videos
      ) {
        videos =
          req.files.videos.map(
            (file) => ({
              type: "upload",
              url:
                "/uploads/videos/" +
                file.filename,
              title:
                file.originalname,
            })
          );
      }

      // Uploaded PDFs
      if (
        req.files &&
        req.files.pdfs
      ) {
        pdfs =
          req.files.pdfs.map(
            (file) => ({
              type: "upload",
              url:
                "/uploads/pdfs/" +
                file.filename,
              title:
                file.originalname,
            })
          );
      }

      // Video URLs
      if (req.body.videoUrls) {

        const videoUrls = JSON.parse(req.body.videoUrls);
        console.log("BODY =>", req.body);
console.log("FILES =>", req.files);

        videoUrls.forEach(
          (url) => {
            videos.push({
              type: "url",
              url,
            });
          }
        );
      }

      // PDF URLs
      if (req.body.pdfUrls) {

        const pdfUrls =
          JSON.parse(
            req.body.pdfUrls
          );

        pdfUrls.forEach(
          (url) => {
            pdfs.push({
              type: "url",
              url,
            });
          }
        );
      }

      const lesson =
        await CourseLesson.create({
          ...req.body,
          videos,
          pdfs,
        });

      res.status(201).json({
        success: true,
        message:
          "Lesson created successfully",
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


// Get Lessons By Module
const getLessonsByModule =
  async (req, res) => {
    try {
      const lessons =
        await CourseLesson.find({
          module:
            req.params.moduleId,
          status: "active",
        }).sort({
          order: 1,
        });

      res.status(200).json({
        success: true,
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


// Get Single Lesson
const getSingleLesson =
  async (req, res) => {
    try {
    const lesson =
  await CourseLesson.findById(
    req.params.id
  ).populate({
    path: "module",
    select: "title course",
  });

      if (!lesson) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Lesson not found",
          });
      }

      res.status(200).json({
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


// Update Lesson
const updateLesson =
  async (req, res) => {
    try {
      const lesson =
        await CourseLesson.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        success: true,
        message:
          "Lesson updated successfully",
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


// Delete Lesson
const deleteLesson =
  async (req, res) => {
    try {
      await CourseLesson.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Lesson deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
const getAllLessons =
  async (req, res) => {
    try {
      const lessons =
        await CourseLesson.find()
          .populate(
            "module",
            "title"
          );

      res.json({
        success: true,
        data: lessons,
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
  createLesson,
  getLessonsByModule,
  getSingleLesson,
  updateLesson,
  deleteLesson,
  getAllLessons
};