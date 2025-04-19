import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  applyForJob,
  deleteRejectedApplication,
  getAllApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/appliaction.controller.js";

const router = express.Router();
router.get("/apply/:id", isAuth, applyForJob);
router.get("/get", isAuth, getAppliedJobs);
router.get("/:id/applicants", isAuth, getAllApplicants);
router.post("/status-update/:id", isAuth, updateApplicationStatus);
router.delete("/delete-rejected", isAuth, deleteRejectedApplication);

export default router;
