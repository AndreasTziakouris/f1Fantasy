module.exports = (req, res, next) => {
  console.log(req.userRole);
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Admin only feature" });
  }
  next();
};
