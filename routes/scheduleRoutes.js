const express = require("express");
const router = express.Router();

const {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSingleSchedule,
} = require("../controllers/scheduleController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createSchedule);
router.get("/", getSchedules);
router.put("/:id", authMiddleware, updateSchedule);
router.delete("/:id", authMiddleware, deleteSchedule);
router.get("/:id", getSingleSchedule);
module.exports = router;