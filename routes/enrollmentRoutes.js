const express = require("express");
const router = express.Router();

const {
  createEnrollment,
  checkEnrollment,
  getMyEnrollments,
  getAllEnrollments,
  getMyCourses,
  getMyCourseDetails,
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, createEnrollment);

router.get("/check/:courseId", authMiddleware, checkEnrollment);

router.get("/my-courses", authMiddleware, getMyEnrollments);

router.get("/all", authMiddleware, adminMiddleware, getAllEnrollments);

router.get("/my-courses", authMiddleware, getMyCourses);
router.get("/course/:courseId", authMiddleware, getMyCourseDetails);
module.exports = router;
