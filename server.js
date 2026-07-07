require("dotenv").config();
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const courseRoutes = require("./routes/courseRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const testRoutes = require("./routes/testRoutes");

dotenv.config();

connectDB();

const app = express();
const authMiddleware = require("./middleware/authMiddleware");

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user });
});
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
// app.use(
//   "/api/orders",
//   orderRoutes
// );

app.use("/api/categories", categoryRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.use("/api/modules", moduleRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/test", testRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/admins", async (req, res) => {
  const admins = await Admin.find();
  res.json(admins);
});
app.get("/", (req, res) => {
  res.send("Backend Running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`);
});
