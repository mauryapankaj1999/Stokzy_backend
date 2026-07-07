const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessonsByModule,
  getSingleLesson,
  updateLesson,
  deleteLesson,
  getAllLessons,
} = require("../controllers/lessonController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Lesson (Admin)
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: "videos",
      maxCount: 20,
    },
    {
      name: "pdfs",
      maxCount: 20,
    },
  ]),
  createLesson,
);

// Get All Lessons
router.get("/", authMiddleware, getAllLessons);

// Get Lessons By Module
router.get("/module/:moduleId", authMiddleware, getLessonsByModule);

// Get Single Lesson
router.get("/:id", authMiddleware, getSingleLesson);

// Update Lesson (Admin)
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: "videos",
      maxCount: 20,
    },
    {
      name: "pdfs",
      maxCount: 20,
    },
  ]),
  updateLesson,
);

// Delete Lesson (Admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteLesson);

module.exports = router;
