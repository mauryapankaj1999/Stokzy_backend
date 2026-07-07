const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      status,
    } = req.body;

    const image = req.file
      ? `/uploads/blogs/${req.file.filename}`
      : "";

    const blog = await Blog.create({
      title,
      slug,
      description,
      image,
      status,
    });

    return res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const totalItems =
      await Blog.countDocuments();

    const blogs =
      await Blog.find()
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const totalPages =
      Math.ceil(
        totalItems / limit
      );

    res.json({
      success: true,

      data: blogs,

      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        limit,

        hasNextPage:
          page < totalPages,

        hasPrevPage:
          page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateBlog = async (
  req,
  res
) => {
  try {
    const {
      title,
      slug,
      description,
      status,
    } = req.body;

    const updateData = {
      title,
      slug,
      description,
      status,
    };

    if (req.file) {
      updateData.image =
        `/uploads/blogs/${req.file.filename}`;
    }

    const blog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getSingleBlogBySlug =
  async (req, res) => {
    try {
      const blog =
        await Blog.findOne({
          slug: req.params.slug,
        });

      if (!blog) {
        return res.status(404).json({
          success: false,
          message:
            "Blog not found",
        });
      }

      res.json({
        success: true,
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };
module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
  getSingleBlog,
  getSingleBlogBySlug,
};