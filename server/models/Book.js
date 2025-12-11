const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  genre: String,
  cover_image_url: String,
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);
