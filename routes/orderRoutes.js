const express = require("express");

const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getMyOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const { downloadInvoice } = require("../controllers/invoiceController");

router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/invoice/:orderId", authMiddleware, downloadInvoice);
module.exports = router;
