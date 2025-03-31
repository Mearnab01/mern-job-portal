import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["job_related", "proposal_related", "custom"],
    },
    message: {
      type: String,
      required: true,
    },
    isRead: { type: Boolean, default: false },
    sendAt: { type: Date, default: Date.now },
    relatedJob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    relatedCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  {
    timestamps: true,
  }
);
export const Notification = mongoose.model("Notification", notificationSchema);
