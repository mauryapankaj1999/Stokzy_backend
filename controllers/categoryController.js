const Category = require("../models/Category");

// Create
const createCategory = async (
  req,
  res
) => {
  try {
    const { name, status } =
      req.body;

    const category =
      await Category.create({
        name,
        slug: name
          .toLowerCase()
          .replaceAll(" ", "-"),
        status,
      });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

// Get All
const getCategories =
  async (req, res) => {
    try {
      const categories =
        await Category.find();

      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Single
const getSingleCategory =
  async (req, res) => {
    try {
      const category =
        await Category.findById(
          req.params.id
        );

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Update
const updateCategory =
  async (req, res) => {
    try {
      const { name, status } =
        req.body;

      const category =
        await Category.findByIdAndUpdate(
          req.params.id,
          {
            name,
            slug: name
              .toLowerCase()
              .replaceAll(
                " ",
                "-"
              ),
            status,
          },
          {
            new: true,
          }
        );

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Delete
const deleteCategory =
  async (req, res) => {
    try {
      await Category.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Category Deleted Successfully",
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
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};