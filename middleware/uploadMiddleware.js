const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdfs");
    } else {
      cb(null, "uploads/videos");
    }

  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        file.originalname
    );
  },
});

const upload = multer({
  storage,
});

module.exports = upload;