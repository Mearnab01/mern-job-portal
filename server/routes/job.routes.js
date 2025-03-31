import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  createJobByAdmin,
  deleteJobByAdmin,
  getAdminJobs,
  getAllJobs,
  getJobById,
} from "../controllers/job.controller.js";

const router = express.Router();
router.post("/post-job", isAuth, createJobByAdmin);
router.get("/admin-jobs", isAuth, getAdminJobs);
router.get("/get-job/:id", isAuth, getJobById);
router.get("/all-jobs", isAuth, getAllJobs);
router.delete("/delete/:id", isAuth, deleteJobByAdmin);
export default router;
