const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead) {
    const error = new Error("user Not authenticated.");
    error.statusCode = 401;
    return next(error);
  }
  const token = authHead.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("user Not authenticated.");
    error.statusCode = 401;
    return next(error);
  }
  req.userId = decodedToken.userId;
  req.userRole = decodedToken.userRole;
  next();
};
