const express = require("express");
const { testEmail } = require("../controllers/testController");

const router = express.Router();

// const { testEmail } = require("../controllers/testController");

router.get("/send-email", testEmail);

module.exports = router;