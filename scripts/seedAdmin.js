require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

const run = async () => {
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  const name = process.env.SEED_ADMIN_NAME || "Admin";

  if (!email || !password) {
    console.error("SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars are required");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.findOneAndUpdate(
    { email },
    { email, password: hashed, name },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Admin upserted:", admin.email, admin._id.toString());
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
