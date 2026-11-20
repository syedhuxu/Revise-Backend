const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  console.log("Cookies:", req.cookies);

  const token = req.cookies?.jwt_token;
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      message: "Please Login",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleware;
