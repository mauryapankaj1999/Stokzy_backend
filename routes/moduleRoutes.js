const express = require("express");

const router = express.Router();

const {
  createModule,
  getModulesByCourse,
  updateModule,
  deleteModule,
  getSingleModule,
} = require("../controllers/moduleController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, adminMiddleware, createModule);

router.get("/course/:courseId", authMiddleware, getModulesByCourse);

router.put("/:id", authMiddleware, adminMiddleware, updateModule);

router.delete("/:id", authMiddleware, adminMiddleware, deleteModule);
router.get("/:id", authMiddleware, getSingleModule);

module.exports = router;
