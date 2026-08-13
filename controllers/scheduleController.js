const Schedule = require("../models/Schedule");

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

const getDayFromDate = (dateStr) => DAYS[new Date(dateStr).getUTCDay()];

const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: schedules });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSchedule = async (req, res) => {
  try {
    const { name, date, time, whatsappLink } = req.body;

    if (!name || !date || !time || !whatsappLink) {
      return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    const schedule = await Schedule.create({
      name,
      date,
      time,
      whatsappLink,
      day: getDayFromDate(date),
    });

    res.status(201).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, whatsappLink } = req.body;

    const updatePayload = { name, time, whatsappLink };
    if (date) {
      updatePayload.date = date;
      updatePayload.day = getDayFromDate(date);
    }

    const schedule = await Schedule.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const schedule = await Schedule.findByIdAndDelete(id);

    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, message: "Schedule deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};