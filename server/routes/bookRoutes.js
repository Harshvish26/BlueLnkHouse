const express = require("express");
const c = require("../controllers/bookController");
const router = express.Router();
const { requireAuthor } = require("../middleware/authMiddleware");
const {requireAdmin}=require("../middleware/authMiddleware");

router.get("/add", requireAuthor, (req, res) => {
  res.render("add_book", { author_id: req.session.author?.id || "" });
});
router.post("/", requireAuthor, c.addBook);
router.get("/list", c.listBooks);
router.get("/search", c.searchBooks);
router.get("/authors/:id/books", requireAdmin, c.adminViewBooks);

module.exports = router;
