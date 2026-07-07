const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
  updateProfile,
  getUserDashboard,
  getUserPurchaseDetails,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

router.put("/change-password", authMiddleware, changePassword);

router.get("/", authMiddleware, getUsers);

router.put("/:id", authMiddleware, updateUser);

router.delete("/:id", authMiddleware, deleteUser);
router.get("/Userdashboard", authMiddleware, getUserDashboard);
router.get("/:userId/details",authMiddleware, getUserPurchaseDetails);
module.exports = router;
