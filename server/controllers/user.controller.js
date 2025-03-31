import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { generateToken } from "../middlewares/generateTokenAndVerify.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";
//1. register user
export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, role, phoneNumber } = req.body;
  if (!fullname || !email || !password || !role || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: "Email is not valid", success: false });
  }
  if (phoneNumber.length !== 10) {
    return res
      .status(400)
      .json({ message: "Phone number is not valid", success: false });
  }
  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
      success: false,
    });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Email already exists", success: false });
  }
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    fullname,
    email,
    password: hashedPassword,
    role,
    phoneNumber,
  });

  newUser.password = null;
  return generateToken(res, newUser, "User registered successfully");
});
//2. login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ message: "Email is not valid", success: false });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found", success: false });
  }
  if (user.role !== role) {
    return res.status(400).json({
      message: "User not found with this current role",
      success: false,
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(400)
      .json({ message: "Invalid credentials", success: false });
  }
  const loggedInUser = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    profile: user.profile,
  };
  return generateToken(res, loggedInUser, `Welcome back ${user.fullname}`);
});
//3. logout user
export const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200).cookie("token", "", { maxAge: 0 }).json({
    success: true,
    message: "User logged out successfully",
  });
});
//4. update user
export const updateUser = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, bio, skills } = req.body;
  const file = req.file;
  //setup cloudinary for image and resume

  let skillsArry;
  if (skills) {
    skillsArry = [
      ...new Set(
        skills
          .split(",")
          .map((skill) => skill.trim().toLowerCase())
          .filter((skill) => skill)
      ),
    ];
  }

  const userId = req.id;
  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skillsArry;

  await user.save();
  user = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    profile: user.profile,
  };
  return res.status(200).json({
    message: "User updated successfully",
    success: true,
    user,
  });
});

//5. delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  //step1: find all applications of the user
  const deletedApplications = await Application.find({ applicant: userId });
  const deleteAppIds = deletedApplications.map((app) => app._id);
  //step2: remove those from job documents
  const jobs = await Job.updateMany(
    { applications: { $in: deleteAppIds } },
    { $pull: { applications: { $in: deleteAppIds } } }
  );
  //step3: remove the application documents
  await Application.deleteMany({ applicant: userId });
  //step4: delete the user
  await User.findByIdAndDelete(userId);
  return res.status(200).json({
    message: "User deleted successfully",
    success: true,
  });
});
