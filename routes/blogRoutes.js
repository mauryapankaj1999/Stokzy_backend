const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  createBlog,
  getBlogs,
  deleteBlog,
  getSingleBlog,
  updateBlog,
  getSingleBlogBySlug,
} = require("../controllers/blogController");
router.post("/", upload.single("image"),createBlog);
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);
router.put("/:id",upload.single("image"),updateBlog);
router.delete("/:id", deleteBlog);
router.get("/slug/:slug",getSingleBlogBySlug);
module.exports = router;