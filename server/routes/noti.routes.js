import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  deleteNotification,
  getAllNotifications,
  markNotificationAsRead,
} from "../controllers/noti.controller.js";

const router = express.Router();
router.get("/get-noti", isAuth, getAllNotifications);
router.put("/read-noti", isAuth, markNotificationAsRead);
router.delete("/delete-noti", isAuth, deleteNotification);
export default router;
