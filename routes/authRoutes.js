const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const upload = require("../middleware/upload");
const {createBlog,} = require("../controllers/blogController");



router.post("/login", login);
router.post("/", upload.single("image"), createBlog);
module.exports = router;