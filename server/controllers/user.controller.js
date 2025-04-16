import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { generateToken } from "../middlewares/generateTokenAndVerify.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";

import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../middlewares/dataUri.js";
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
    profile: {
      bio: user.profile?.bio || "",
      skills: user.profile?.skills || [],
      resume: user.profile?.resume || "",
      resumeOriginalName: user.profile?.resumeOriginalName || "",
      profilePicture: user.profile?.profilePicture || "",
    },
  };
  return generateToken(res, loggedInUser, `Welcome back ${user.fullname}`);
});
//3. logout user
export const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0, // Clears the cookie
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
});

//4. update user
export const updateUser = asyncHandler(async (req, res) => {
  const { fullname, phoneNumber, bio, skills } = req.body;
  const files = req.files;
  const userId = req.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  // === Profile Picture ===
  if (files?.profilePicture?.[0]) {
    const profileFile = files.profilePicture[0];
    if (user.profile.profilePicture) {
      await cloudinary.uploader.destroy(
        user.profile.profilePicture.split("/").pop().split(".")[0]
      );
    }

    const fileUri = getDataUri(profileFile);
    const uploaded = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto",
      folder: "profile_pictures",
    });

    user.profile.profilePicture = uploaded.secure_url;
  }

  // === Resume ===
  if (files?.resume?.[0]) {
    const resumeFile = files.resume[0];
    const fileUri = getDataUri(resumeFile);
    const uploadedResume = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto",
      folder: "resumes",
      format: "pdf",
    });

    user.profile.resume = uploadedResume.secure_url;
    user.profile.resumeOriginalName = resumeFile.originalname;
  }

  // === Other Fields ===
  if (fullname) user.fullname = fullname;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;

  if (skills) {
    let skillsArray = skills
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    skillsArray = [...new Set(skillsArray)];
    user.profile.skills = skillsArray;
  }

  await user.save();

  const userData = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: {
      bio: user.profile?.bio || "",
      skills: user.profile?.skills || [],
      profilePicture: user.profile?.profilePicture || "",
      resume: user.profile?.resume || "",
      resumeOriginalName: user.profile?.resumeOriginalName || "",
    },
  };

  return res.status(200).json({
    message: "User updated successfully",
    success: true,
    user: userData,
  });
});
