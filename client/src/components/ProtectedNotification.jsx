import Notification from "@/pages/Notification";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedNotification = () => {
  const { user } = useSelector((store) => store.auth);

  if (!user || user.role !== "student") {
    return <Navigate to="/" />;
  }

  return <Notification />;
};

export default ProtectedNotification;
