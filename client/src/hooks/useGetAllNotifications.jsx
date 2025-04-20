import { setNotifications } from "@/redux/notificationSlice";
import { NOTIFICATION_API } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useGetAllNotifications = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllNotis = async () => {
      try {
        const res = await axios.get(`/api/notification/get-noti`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setNotifications(res.data.notification));
        }
        //console.log(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to get notifications");
      }
    };
    fetchAllNotis();
  }, []);
};

export default useGetAllNotifications;
