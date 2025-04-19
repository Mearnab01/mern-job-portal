import { asyncHandler } from "../middlewares/errorHandler.js";
import { Notification } from "../models/notification.model.js";

//1. get all notifications
export const getAllNotifications = asyncHandler(async (req, res) => {
  const notification = await Notification.find({ recipient: req.id })
    .populate({
      path: "relatedJob",
      select: "title company",
    })
    .populate({
      path: "relatedCompany",
      select: "name",
    })
    .sort({ sendAt: -1 });
  if (!notification) {
    return res.status(404).json({ message: "No notifications found" });
  }
  return res.status(200).json({ notification, success: true });
});
//2. mark notifications as read
export const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findByIdAndUpdate(
    { _id: notificationId, recipient: req.id },
    { isRead: true },
    { new: true }
  );
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  return res
    .status(200)
    .json({ message: "Notification marked as read", success: true });
});
//3. delete a notification
export const deleteNotification = asyncHandler(async (req, res) => {
  const notificationId = req.params.id;
  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    recipient: req.id,
  });
  if (!notification) {
    return res.status(404).json({ message: "Notification not found" });
  }
  return res
    .status(200)
    .json({ message: "Notification deleted", success: true });
});
