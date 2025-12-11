exports.requireAuthor = (req, res, next) => {
  if (req.session && req.session.author && req.session.author.id) {
    return next();
  }
  return res.redirect("/author/login");
};

exports.requireAdmin = (req, res, next) => {
  if (req.session && req.session.admin) return next();
  return res.redirect("/admin/login");
};
