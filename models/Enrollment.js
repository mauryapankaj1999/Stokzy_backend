const mongoose = require("mongoose");

const enrollmentSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      paymentId: {
        type: String,
        default: "",
      },

      amount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "paid",
          "failed",
        ],
        default: "paid",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Enrollment",
    enrollmentSchema
  );