import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  applyForJob,
  getAllApplicants,
  getAppliedJobs,
  updateApplicationStatus,
} from "../controllers/appliaction.controller.js";

const router = express.Router();
router.post("/apply/:id", isAuth, applyForJob);
router.get("/get", isAuth, getAppliedJobs);
router.get("/:id/applicants", isAuth, getAllApplicants);
router.post("/status-update/:id", isAuth, updateApplicationStatus);

export default router;
