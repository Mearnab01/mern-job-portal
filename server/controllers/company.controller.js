import { asyncHandler } from "../middlewares/errorHandler.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
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
  // your logic here
});

// 3. Get all companies
export const getAllCompanies = asyncHandler(async (req, res) => {
  const userId = req.id;
  const companies = await Company.find({ userId }).sort({
    createdAt: -1,
  });
  if (companies.length === 0) {
    return res.status(404).json({
      message: "No companies found",
      success: false,
    });
  }
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
export const deleteCompany = async (req, res) => {
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
};
