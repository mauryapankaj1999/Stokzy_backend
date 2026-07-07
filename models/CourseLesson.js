// const mongoose = require("mongoose");

// const courseLessonSchema =
//   new mongoose.Schema(
//     {
//       module: {
//         type:
//           mongoose.Schema.Types.ObjectId,
//         ref: "CourseModule",
//         required: true,
//       },

//       title: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       description: {
//         type: String,
//         default: "",
//       },

//       videos: [
//         {
//           title: {
//             type: String,
//             default: "",
//           },

//           videoUrl: {
//             type: String,
//             default: "",
//           },

//           duration: {
//             type: String,
//             default: "",
//           },
//         },
//       ],

//       duration: {
//         type: String,
//         default: "",
//       },

//       order: {
//         type: Number,
//         default: 1,
//       },

//       isPreview: {
//         type: Boolean,
//         default: false,
//       },

//       status: {
//         type: String,
//         enum: [
//           "active",
//           "inactive",
//         ],
//         default: "active",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =
//   mongoose.model(
//     "CourseLesson",
//     courseLessonSchema
//   );


const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
  {
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseModule",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    order: {
      type: Number,
      default: 0,
    },

    // Multiple Videos
    videos: [
      {
        type: {
          type: String,
          enum: ["upload", "url"],
          required: true,
        },

        url: {
          type: String,
          required: true,
        },

        title: String,
      },
    ],

    // Multiple PDFs
    pdfs: [
      {
        type: {
          type: String,
          enum: ["upload", "url"],
          required: true,
        },

        url: {
          type: String,
          required: true,
        },

        title: String,
      },
    ],

    duration: String,

    isPreview: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CourseLesson",
  lessonSchema
);