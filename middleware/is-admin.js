exports.isAdmin = (req, res, next) => {
  if (req.userRole !== "Admin") {
    return res.status(403).json({ message: "Admin only feature" });
  }
  next();
};
