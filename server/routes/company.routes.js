import express from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
} from "../controllers/company.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();
router.post("/register-company", isAuth, createCompany);
router.get("/companies", isAuth, getAllCompanies);
router.get("/:id", isAuth, getCompanyById);
router.delete("/:id", isAuth, deleteCompany);

export default router;
