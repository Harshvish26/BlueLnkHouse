const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const authorController = require("../controllers/authorController");
const { requireAdmin } = require("../middleware/authMiddleware");

// Author registration & login pages
router.get("/author/register", (req, res) => res.render("register")); 
router.post("/author/register", auth.registerAuthor);

router.get("/author/login", (req, res) => res.render("author_login"));
router.post("/author/login", auth.loginAuthor);

router.get("/author/logout", auth.logoutAuthor);

// Admin login
router.get("/admin/login", (req, res) => res.render("admin_login"));
router.post("/admin/login", auth.loginAdmin);
router.get("/admin/logout", auth.logoutAdmin);

//Approve route should require admin
router.get("/authors/:id/approve", requireAdmin, authorController.approveAuthor);

module.exports = router;
