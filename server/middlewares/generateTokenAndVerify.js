import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  try {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    console.log("cookie set successfully");
    return res.status(200).json({
      user,
      message,
    });
  } catch (error) {
    console.error("Error in generateToken:", error);
  }
};
