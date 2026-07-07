const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "image") {
      cb(null, "uploads/blogs");
    } else if (
      file.fieldname === "thumbnail"
    ) {
      cb(null, "uploads/courses");
    } else if (
      file.fieldname === "videoFile"
    ) {
      cb(null, "uploads/videos");
    } else {
      cb(null, "uploads");
    }
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(
          Math.random() * 1e9
        ) +
        path.extname(
          file.originalname
        )
    );
  },
});

module.exports = multer({
  storage,
});