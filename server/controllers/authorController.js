const Author = require("../models/Author");
const Book = require("../models/Book"); 

// ---------- AUTHOR REGISTER ---------

exports.createAuthor = async (req, res) => {
  try {
    await Author.create(req.body);
    res.redirect("/authors/list");
  } catch (e) {
    console.error("Error creating author:", e);
    res.send("<h3 style='color:red'>Error creating author</h3>");
  }
};

// ------------ GET AUTHORS -------
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "author_id",
          as: "authoredBooks" 
        }
      },
      {
        $addFields: {
          bookCount: { $size: "$authoredBooks" } 
        }
      },
      {
        $project: {
          authoredBooks: 0, 
          password: 0,     
        }
      }
    ]);
    
    res.render("author_list", { authors }); 
  } catch (e) {
    console.error("Error fetching authors:", e);
    res.send("<h3 style='color:red'>Error loading authors list</h3>");
  }
};

// ------------ APPROVE AUTHOR ------------
exports.approveAuthor = async (req, res) => {
  try {
    await Author.findByIdAndUpdate(req.params.id, { status: "approved" });
    res.redirect("/authors/list");
  } catch (e) {
    console.error("Error approving author:", e);
    res.send("<h3 style='color:red'>Error approving author</h3>");
  }
};