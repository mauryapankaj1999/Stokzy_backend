// const mongoose = require("mongoose");

// const courseSchema =
//   new mongoose.Schema(
//     {
//       title: {
//         type: String,
//         required: true,
//       },

//       slug: {
//         type: String,
//         required: true,
//         unique: true,
//       },

//       thumbnail: {
//         type: String,
//         default: "",
//       },

//       shortDescription: {
//         type: String,
//         default: "",
//       },

//       description: {
//         type: String,
//         default: "",
//       },
//        category: {
//         type:
//           mongoose.Schema.Types.ObjectId,
//         ref: "Category",
//       },
//       price: {
//         type: Number,
//         default: 0,
//       },

//       discountPrice: {
//         type: Number,
//         default: 0,
//       },

//       duration: {
//         type: String,
//         default: "",
//       },

//       level: {
//         type: String,
//         enum: [
//           "Beginner",
//           "Intermediate",
//           "Advanced",
//         ],
//         default: "Beginner",
//       },

//       status: {
//         type: String,
//         enum: [
//           "active",
//           "inactive",
//         ],
//         default: "active",
//       },

//       videoType: {
//         type: String,
//         enum: [
//           "url",
//           "upload",
//         ],
//         default: "url",
//       },

//       videoUrl: {
//         type: String,
//         default: "",
//       },

//       videoFile: {
//         type: String,
//         default: "",
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );

// module.exports =  mongoose.model("Course", courseSchema );

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    // ⭐ NEW
    thumbnailPublicId: {
      type: String,
      default: "",
    },

    shortDescription: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    price: {
      type: Number,
      default: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String,
      default: "",
    },

    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      default: "Beginner",
    },

    status: {
      type: String,
      enum: [
        "active",
        "inactive",
      ],
      default: "active",
    },

    videoType: {
      type: String,
      enum: [
        "url",
        "upload",
      ],
      default: "url",
    },

    videoUrl: {
      type: String,
      default: "",
    },

    videoFile: {
      type: String,
      default: "",
    },

    // ⭐ NEW
    videoPublicId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Course",
  courseSchema
);