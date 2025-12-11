const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  bio: String,
  profile_image_url: String,
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Author", authorSchema);
