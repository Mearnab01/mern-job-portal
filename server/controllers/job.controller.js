import { asyncHandler } from "../middlewares/errorHandler.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import { Notification } from "../models/notification.model.js";

//1.create a job by admin
export const createJobByAdmin = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    experienceLevel,
    location,
    jobType,
    position,
    companyId,
    isActive,
    isRemote,
  } = req.body;

  const userId = req.id;

  const job = await Job.create({
    title,
    description,
    requirements: requirements.split(","),
    salary: Number(salary),
    experienceLevel,
    location,
    position,
    jobType,
    company: companyId,
    isActive,
    isRemote,
    createdBy: userId,
  });

  const notification = new Notification({
    recipient: userId,
    type: "job_related",
    message: `New job created: ${title}`,
    relatedJob: job._id,
    relatedCompany: companyId,
  });

  await notification.save();

  return res.status(201).json({
    success: true,
    message: "Job created successfully",
    job,
  });
});

//2. get all jobs by admin
export const getAdminJobs = asyncHandler(async (req, res) => {
  const adminId = req.id;
  const jobs = await Job.find({ createdBy: adminId })
    .populate({ path: "company" })
    .sort({ createdAt: -1 });
  if (!jobs) {
    return res.status(404).json({ message: "No jobs found" });
  }
  return res.status(200).json({
    success: true,
    message: "Jobs fetched successfully",
    jobs,
  });
});

//3. get a job by id for users
export const getJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId)
    .populate({
      path: "applications",
      createdAt: -1,
    })
    .populate({
      path: "company",
    });

  if (!job) return res.status(404).json({ message: "Job not found" });
  return res.status(200).json({
    success: true,
    message: "Job fetched successfully",
    job,
  });
});

//4. get all jobs for users
export const getAllJobs = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword || "";
  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } }, // regex allows partia matches (e.g., "dev" matches "developer").
      //options: "i" makes it case-insensitive.
      { location: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  };

  const jobs = await Job.find(query)
    .populate({
      path: "company",
    })
    .sort({ createdAt: -1 });
  if (jobs.length === 0) {
    console.warn("no jobs found");
  }
  return res.status(200).json({
    message: "Jobs fetched successfully",
    jobs,
    success: true,
  });
});

// 5. Delete a job by admin
export const deleteJobByAdmin = asyncHandler(async (req, res) => {
  const jobId = req.body.id;

  if (!jobId) {
    return res
      .status(400)
      .json({ message: "Job ID is required", success: false });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }

  // Step 1: Find all users who saved or applied for the job
  const affectedUsers = await User.find({
    $or: [{ savedJobs: jobId }, { appliedJobs: jobId }],
  });

  console.log(
    "Affected Users:",
    affectedUsers.map((u) => u.email)
  );

  // Step 2: Remove the job from users' saved jobs
  await User.updateMany({ savedJobs: jobId }, { $pull: { savedJobs: jobId } });

  // Step 3: Delete related applications
  await Application.deleteMany({ job: jobId });

  // Step 4: Delete the job itself
  await Job.findByIdAndDelete(jobId);

  // Step 5: Delete related notifications
  await Notification.deleteMany({ relatedJob: jobId });

  // Step 6: Notify affected users
  const notifications = affectedUsers.map((user) => ({
    recipient: user._id,
    message: `The job "${job.title}" has been deleted by the admin.`,
    type: "job_related",
    relatedCompany: job.company,
    relatedJob: null,
    sendAt: new Date(),
    isRead: false,
  }));
  await Notification.insertMany(notifications);

  res.status(200).json({
    message: "Job deleted and users notified successfully.",
    success: true,
  });
});

// 6. suggessted job
export const getSuggestedJobs = asyncHandler(async (req, res) => {
  const { jobId } = req.params;
  const originalJob = await Job.findById(jobId);

  if (!originalJob) {
    res.status(404);
    throw new Error("Job not found");
  }

  const { requirements } = originalJob;

  // Build a clean skill set
  const skills = [...requirements]
    .join(" ")
    .toLowerCase()
    .match(/\b[a-z]+\b/g)
    .filter((word) => word.length > 3);

  const skillSet = Array.from(new Set(skills)); // remove duplicates

  // Match other jobs based on shared skills
  const allJobs = await Job.find({
    _id: { $ne: jobId },
    isActive: true,
  }).populate("company", "name");

  const relevantJobs = allJobs.filter((job) => {
    const jobText = [...job.requirements].join(" ").toLowerCase();

    const sharedWords = skillSet.filter((skill) => jobText.includes(skill));

    // Only include jobs with at least 2 shared meaningful skills
    return sharedWords.length >= 2;
  });

  res.status(200).json({ success: true, job: relevantJobs });
});
