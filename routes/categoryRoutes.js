const express = require("express");
const router = express.Router();
const {  createCategory, getCategories,getSingleCategory, updateCategory, deleteCategory,
} = require(
  "../controllers/categoryController"
);

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getSingleCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;