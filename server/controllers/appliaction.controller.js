import { asyncHandler } from "../middlewares/errorHandler.js";
import { Application } from "../models/application.model.js";
import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { io } from "../socket/socket.js";

//1. application for a job
export const applyForJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const userId = req.id;

  const user = await User.findById(userId);
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  });

  if (existingApplication) {
    return res.status(400).json({
      message: "You have already applied for this job",
      success: false,
    });
  }

  const job = await Job.findById(jobId);
  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }

  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(newApplication._id);
  await job.save();

  if (user.role === "student") {
    const submittedProposalApplication = await Notification.create({
      recipient: userId,
      type: "proposal_related",
      message: `Your application for "${job.title}" has been submitted successfully.`,
      relatedJob: jobId,
      relatedCompany: job.company._id,
      isRead: false,
      sendAt: new Date(),
    });
    io.to(userId).emit("proposal_related", submittedProposalApplication);
  }

  res.status(200).json({
    message: "Application submitted successfully",
    success: true,
  });
});

//2. get applications for a job
export const getAppliedJobs = asyncHandler(async (req, res) => {
  const userId = req.id;
  const applications = await Application.find({ applicant: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "job",
      populate: { path: "company" },
    });
  if (!applications) {
    return res
      .status(404)
      .json({ message: "No applications found", success: false });
  }
  res.status(200).json({
    message: "Applications fetched successfully",
    success: true,
    job: applications,
  });
});
//3. get all the applicants
export const getAllApplicants = asyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId).populate({
    path: "applications",
    populate: {
      path: "applicant",
      select:
        "profile.profilePicture profile.resume profile.resumeOriginalName fullname email phoneNumber",
    },
  });
  if (!job) {
    return res.status(404).json({ message: "Job not found", success: false });
  }
  return res.status(200).json({
    success: true,
    job,
  });
});
//4. update application status
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
      success: false,
    });
  }

  // Update and return the updated application
  const updatedApplication = await Application.findOneAndUpdate(
    { _id: applicationId },
    { status: status.toLowerCase() },
    { new: true } // Returns the updated document
  );

  if (!updatedApplication) {
    return res.status(404).json({
      message: "Application not found.",
      success: false,
    });
  }
  const populatedApp = await updatedApplication.populate("applicant job");

  const message =
    status.toLowerCase() === "accepted"
      ? `🎉 Congrtulation, Your application for "${populatedApp.job.title}" has been accepted!`
      : `😞 Opps, Your application for "${populatedApp.job.title}" was rejected.`;

  const createdNotification = await Notification.create({
    recipient: populatedApp.applicant._id,
    message,
    type: "proposal_related",
    relatedJob: populatedApp.job._id,
    relatedCompany: populatedApp.job.company,
    sendAt: new Date(),
    isRead: false,
  });

  io.to(populatedApp.applicant._id.toString()).emit(
    "proposal_related",
    createdNotification
  );

  return res.status(200).json({
    message: "Status updated successfully.",
    success: true,
    updatedApplication: updatedApplication.status,
  });
});

//5. delete rejected application
export const deleteRejectedApplication = async (req, res) => {
  const { applicationId } = req.body;
  const applicantId = req.id;

  if (!applicationId) {
    return res.status(400).json({ message: "Application ID is required" });
  }

  try {
    const application = await Application.findOne({
      _id: applicationId,
      applicant: applicantId,
    });

    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found or unauthorized" });
    }

    if (application.status !== "rejected") {
      return res
        .status(400)
        .json({ message: "Only rejected applications can be deleted" });
    }

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: "Rejected application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting rejected application:", error.message);
    res
      .status(500)
      .json({ message: "Server error while deleting rejected application" });
  }
};
