import jwt from "jsonwebtoken";
export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized User" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken || !verifyToken.userId) {
      return res.status(401).json({ message: "Token expired" });
    }
    req.id = verifyToken.userId;
    next();
  } catch (error) {
    console.error("Error in isAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
