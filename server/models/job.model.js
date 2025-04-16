import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: Number, required: true },
    position: { type: String, required: true },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior"],
      required: true,
    },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    isActive: { type: Boolean, default: true },
    isRemote: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Job = mongoose.model("Job", jobSchema);
