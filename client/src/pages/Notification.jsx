import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MailIcon, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "@/redux/notificationSlice";
import useGetAllNotifications from "@/hooks/useGetAllNotifications";
import toast from "react-hot-toast";
import axios from "axios";

const Notification = () => {
  useGetAllNotifications();
  const { notifications } = useSelector((store) => store.notification);
  const dispatch = useDispatch();
  //console.log(notifications);

  //console.log("notifications with undefined relatedCompany:",notifications.filter((n) => !n.relatedCompany));

  const markAsRead = async (id) => {
    try {
      const res = await axios.put(
        `/api/notification/read-noti`,
        { _id: id },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(
          setNotifications(
            notifications.map((n) =>
              n._id === id ? { ...n, isRead: true } : n
            )
          )
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      const res = await axios.delete(`/api/notification/delete-noti`, {
        data: { _id: id },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Notification deleted");
        //dispatch(setNotifications((prev) => prev.filter((n) => n._id !== id)));
        const updated = await axios.get(`/api/notification/get-noti`, {
          withCredentials: true,
        });
        dispatch(setNotifications(updated.data.notification));
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occurred while deleting the notification");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <MailIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Your Notifications
            </h2>
            <p className="text-sm text-gray-500">
              Stay updated with your job progress
            </p>
          </div>
        </div>

        {/* Notification List */}
        <ScrollArea className="h-[70vh] pr-2">
          {notifications?.length === 0 ? (
            <div className="text-center mt-20">
              <img
                src="https://assets.streamlinehq.com/image/private/w_800,h_800,ar_1/f_auto/v1/icons/seoul-duotone/communication/communication/no-mail-a8ogdzyoztkcis43d2ih5f.png?_a=DAJFJtWIZAAC"
                alt="empty"
                className="mx-auto w-40"
              />
              <h3 className="text-gray-600 font-medium mt-4">
                No notifications found
              </h3>
              <p className="text-sm text-gray-400">You're all caught up 🎉</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications?.map((n) => (
                <motion.div
                  key={n._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={`flex items-start gap-4 p-4 border ring-1 ring-gray-100 rounded-xl shadow-sm transition-all hover:scale-[1.01] hover:shadow-md bg-white cursor-pointer ${
                      n.isRead ? "opacity-70" : "opacity-100"
                    }`}
                  >
                    <img
                      src={
                        n.relatedCompany?.logo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPCmaaFJYIywZaF5Ue20ptsBZBchr0_y--w&s"
                      }
                      alt={n.relatedCompany?.name || "logo"}
                      className="w-12 h-12 rounded-full object-contain border border-de_primary"
                    />
                    <div className="flex-1">
                      <CardHeader className="p-0 mb-1">
                        <CardTitle className="text-md font-semibold text-gray-800">
                          {n.relatedCompany?.name || n.type || "Unknown"}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 text-sm text-gray-600">
                        <p>{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDistanceToNow(new Date(n.sendAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </CardContent>
                    </div>
                    <div className="flex items-end gap-2">
                      {!n.isRead && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => markAsRead(n._id)}
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </Button>
                      )}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteNotification(n._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default Notification;
