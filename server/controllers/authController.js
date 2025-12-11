const Author = require("../models/Author");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const ADMIN = require("../config/admin");

//------AUTHOR REGISTER ------
exports.registerAuthor = async (req, res) => {
  try {
    const { name, email, password, bio, profile_image_url } = req.body;

    if (!name || !email || !password) {
      return res.send("<h3 style='color:red'>Name, email & password required</h3>");
    }

    const exists = await Author.findOne({ email });
    if (exists) {
      return res.send("<h3 style='color:red'>Email already registered. Please login.</h3>");
    }

    const hashed = await bcrypt.hash(password, 10);
    const author = await Author.create({
      name, email, password: hashed, bio, profile_image_url
    });

    req.session.author = { id: author._id, name: author.name, email: author.email };
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    return res.send("<h3 style='color:red'>Error while registering author</h3>");
  }
};

// ------------ AUTHOR LOGIN ------------
exports.loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email });
    if (!author) return res.send("<h3 style='color:red'>Invalid credentials</h3>");

    const ok = await bcrypt.compare(password, author.password);
    if (!ok) return res.send("<h3 style='color:red'>Invalid credentials</h3>");

    req.session.author = { id: author._id, name: author.name, email: author.email };
    return res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.send("<h3 style='color:red'>Login error</h3>");
  }
};

// ------------ AUTHOR LOGOUT ------------
exports.logoutAuthor = (req, res) => {
  req.session.author = null;
  res.redirect("/");
};

// ------------ ADMIN LOGIN ------------
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== ADMIN.email || password !== ADMIN.password) {
      return res.send("<h3 style='color:red'>Invalid admin credentials</h3>");
    }

    req.session.admin = { email: ADMIN.email };
    return res.redirect("/authors/list"); 
  } catch (err) {
    console.log(err);
    res.send("<h3 style='color:red'>Admin login error</h3>");
  }
};

// ------- ADMIN LOGOUT ------------
exports.logoutAdmin = (req, res) => {
  req.session.admin = null;
  res.redirect("/");
};
