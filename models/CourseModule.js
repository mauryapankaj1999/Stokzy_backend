const mongoose = require("mongoose");

const courseModuleSchema =
  new mongoose.Schema(
    {
      course: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      order: {
        type: Number,
        default: 1,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "CourseModule",
    courseModuleSchema
  );