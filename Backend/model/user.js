const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "staff", "admin"], default: "user" },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
  phone: String,
  dob: Date,
  address: String,
  Work: Date,
  avatar: String  // To store image URL or base64
});


module.exports = mongoose.model("User", UserSchema);
