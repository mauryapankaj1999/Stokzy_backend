const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createCourse,
  getCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  getCourseBySlug,
  
} = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",upload.single("thumbnail"), createCourse);
router.get("/", getCourses);
router.get("/:id", getSingleCourse);
// router.put("/:id", updateCourse);
router.put("/:id", upload.single("thumbnail"),updateCourse);
router.delete("/:id", deleteCourse);
router.get("/slug/:slug", getCourseBySlug);

module.exports = router;