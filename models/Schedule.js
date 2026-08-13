// import mongoose from "mongoose";

// const scheduleSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String, 
//       required: true,
//     },
//     day: {
//       type: String, 
//       required: true,
//     },
//     whatsappLink: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Schedule", scheduleSchema);

const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    day: { type: String, required: true },
    whatsappLink: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);