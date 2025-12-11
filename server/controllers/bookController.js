const Book = require("../models/Book");
const Author = require("../models/Author");

exports.addBook = async (req, res) => {
  try {
    const author_id = req.session?.author?.id;
    if (!author_id) return res.send("<h3 style='color:red'>Please login as author to add book.</h3>");

    const author = await Author.findById(author_id);
    if (!author) return res.send("<h3 style='color:red'>Author not found</h3>");
    if (author.status !== "approved") {
      return res.send("<h3 style='color:orange'>Your account is not approved yet. Wait for admin.</h3>");
    }

    const payload = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      cover_image_url: req.body.cover_image_url,
      author_id
    };

    await Book.create(payload);
    return res.redirect("/books/list");
  } catch (err) {
    console.log(err);
    return res.send("<h3 style='color:red'>Error adding book</h3>");
  }
};

// ------------------- LIST BOOKS (FIXED) -------------------
exports.listBooks = async (req, res) => {
  try {
    const author_id = req.session?.author?.id;

    let query = {};
    if (author_id) {
      query = { author_id };
    }
    
    let books = await Book.find(query)
      .populate("author_id");

    return res.render("book_list", { books, q: "" });
  } catch (err) {
    console.log(err);
    return res.send("<h3 style='color:red'>Error loading books</h3>");
  }
};


// ------------------- SEARCH BOOKS (FIXED) -------------------
exports.searchBooks = async (req, res) => {
  try {
    const q = req.query.q || "";

    const authors = await Author.find({
      name: new RegExp(q, "i")
    }).select("_id");
    
    const authorIds = authors.map(author => author._id);

    const books = await Book.find({
      $or: [
        { title: new RegExp(q, "i") },
        { genre: new RegExp(q, "i") },
        { author_id: { $in: authorIds } }
      ]
    }).populate("author_id");

    return res.render("book_list", { books, q });
  } catch (err) {
    console.log(err);
    return res.send("<h3 style='color:red'>Error searching books</h3>");
  }
};

// ADMIN: View books of selected author
exports.adminViewBooks = async (req, res) => {
  try {
    const authorId = req.params.id; 

    const books = await Book.find({ author_id: authorId }) 
      .populate("author_id");

    return res.render("admin_author_books", { books });
  } catch (err) {
    console.log(err);
    return res.send("<h3 style='color:red'>Error loading author books</h3>");
  }
};



