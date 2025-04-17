import express from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  test,
  updateCompany,
} from "../controllers/company.controller.js";
import { isAuth } from "../middlewares/isAuth.js";
import { logoUpload } from "../middlewares/multer.js";

const router = express.Router();
router.post("/register-company", isAuth, createCompany);
router.put("/update/:id", logoUpload, updateCompany);
router.post("/test", logoUpload, test);
router.get("/companies", isAuth, getAllCompanies);
router.get("/:id", isAuth, getCompanyById);
router.delete("/:id", isAuth, deleteCompany);

export default router;
