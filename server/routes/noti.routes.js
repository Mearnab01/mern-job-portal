import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  deleteNotification,
  getAllNotifications,
  markNotificationAsRead,
} from "../controllers/noti.controller.js";

const router = express.Router();
router.get("/get-noti", isAuth, getAllNotifications);
router.put("/:id/read", isAuth, markNotificationAsRead);
router.delete("/:id", isAuth, deleteNotification);
export default router;
