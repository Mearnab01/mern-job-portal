import { asyncHandler } from "../middlewares/errorHandler.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";

import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../middlewares/dataUri.js";
// 1. Create a company
export const createCompany = asyncHandler(async (req, res) => {
  const { companyName } = req.body;

  if (!companyName) {
    return res.status(400).json({
      message: "Company name is required",
      success: false,
    });
  }

  let company = await Company.findOne({ name: companyName });

  if (company) {
    return res.status(400).json({
      message: `${companyName} is already registered`,
      success: false,
    });
  }

  company = await Company.create({
    name: companyName,
    userId: req.id,
  });

  res.status(201).json({
    message: "Company created successfully",
    success: true,
    company,
  });
});

// 2. Update company
export const updateCompany = asyncHandler(async (req, res) => {
  const file = req.file;
  const { name, description, website, location } = req.body;
  //console.log("📸 File:", file);
  const company = await Company.findById(req.params.id);
  if (!company) {
    return res.status(404).json({
      message: "Company not found.",
      success: false,
    });
  }

  // === Cloudinary Upload using getDataUri ===
  let updatedLogoUrl = company.logo;

  if (file) {
    // Optional: Delete previous logo
    if (company.logo) {
      const publicId = company.logo.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`company_logo/${publicId}`);
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "auto",
      folder: "company_logo",
    });

    updatedLogoUrl = cloudResponse.secure_url;
  }

  const updateData = {
    name: name || company.name,
    description,
    website,
    location,
    logo: updatedLogoUrl,
  };

  const updatedCompany = await Company.findByIdAndUpdate(
    req.params.id,
    updateData,
    {
      new: true,
    }
  );

  return res.status(200).json({
    message: "Company information updated successfully.",
    success: true,
    company: updatedCompany,
  });
});

// 3. Get all admin companies
export const getAllCompanies = asyncHandler(async (req, res) => {
  const userId = req.id;
  const companies = await Company.find({ userId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    message: "Companies fetched successfully",
    success: true,
    companies,
  });
});

// 4. Get company by ID
export const getCompanyById = asyncHandler(async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findById(companyId);
  if (!company) {
    return res.status(404).json({
      message: "Company not found",
      success: false,
    });
  }
  res.status(200).json({
    message: "Company fetched successfully",
    success: true,
    company,
  });
});

// 5. Delete company
export const deleteCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    // Step 1: Find all jobs related to this company
    const jobs = await Job.find({ company: companyId });
    const jobIds = jobs.map((job) => job._id);

    // Step 2: Delete all applications linked to these jobs
    await Application.deleteMany({ job: { $in: jobIds } });

    // Step 3: Delete all jobs related to this company
    await Job.deleteMany({ company: companyId });

    // Step 4: Delete the company
    await Company.findByIdAndDelete(companyId);

    res.status(200).json({
      message: "Company, related jobs, and applications deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

// a powerful postman lesson
export const test = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const file = req.file;
  if (!file) {
    console.error("file not found");
    return res.json({
      success: false,
    });
  }
  console.log(file);
  console.log(name);
  return res.json({
    success: true,
  });
});
