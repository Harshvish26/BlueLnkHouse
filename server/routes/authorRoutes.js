const express = require("express");
const router = express.Router();
const c = require("../controllers/authorController");
const { requireAdmin } = require("../middleware/authMiddleware");
const bookC = require("../controllers/bookController");

router.get("/add", (req, res) => res.render("add_author")); 
router.post("/", c.createAuthor); 
router.get("/list", requireAdmin, c.getAuthors); 
router.get("/:id/books", requireAdmin, bookC.adminViewBooks);
module.exports = router;
