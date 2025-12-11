require("dotenv").config();
const express = require("express");
const session = require("express-session");
const connectDB = require("./config/db");
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const path = require("path");

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "blueink-secret-123",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.get("/", (req, res) => res.render("home"));

app.use("/", authRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);


app.get("/dashboard", async (req, res) => {
  const Author = require("./models/Author");
  if (!req.session?.author?.id) {
    return res.render("dashboard", { author: null });
  }
  const author = await Author.findById(req.session.author.id);
  res.render("dashboard", { author });
});

app.listen(5000, () => console.log("Server running on 5000"));
