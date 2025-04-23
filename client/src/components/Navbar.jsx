import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Bell,
  BriefcaseBusinessIcon,
  Building2Icon,
  Home,
  LogOut,
  Rocket,
  User2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import toast from "react-hot-toast";
import axios from "axios";
import MobileNav from "@/responsive/MobileNav";
import { setNotifications } from "@/redux/notificationSlice";
import io from "socket.io-client";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { notifications } = useSelector((store) => store.notification);
  //console.log("notifications", notifications);

  const hasUnread =
    Array.isArray(notifications) && notifications.some((n) => !n.isRead);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(`/api/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to Logout user!");
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server!", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection failed:", err.message);
    });

    socket.on("new_job_notification", (notification) => {
      console.log("New notification received:", notification);
      dispatch(setNotifications([...notifications, notification]));
      toast.success("You have a new notification!");
    });
    socket.on("new_user_registered", (notification) => {
      console.log("New notification received:", notification);
      dispatch(setNotifications([...notifications, notification]));
      toast.success("You have a new notification!");
    });
    socket.on("proposal_related", (notification) => {
      console.log("New notification received:", notification);
      dispatch(setNotifications([...notifications, notification]));
      toast.success("You have a new notification!");
    });

    return () => {
      socket.disconnect();
    };
  }, [notifications, dispatch]);

  return (
    <div className="bg-gradient-to-r from-white to-de_primary shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src="/promotion.png"
            alt="logo"
            className="w-11 h-11 backdrop-brightness-70 border-2 rounded-full"
          />
          <h1 className="text-2xl font-bold">
            Next <span className="text-de_primary">Hire</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link
                to="/admin/companies"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center"
              >
                <Building2Icon className="w-4 h-4 mr-2" />
                Companies
              </Link>
              <Link
                to="/admin/jobs"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center"
              >
                <Rocket className="w-4 h-4 mr-2" />
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center"
              >
                <Home className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <Link
                to="/jobs"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center"
              >
                <BriefcaseBusinessIcon className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Jobs</span>
              </Link>
              <Link
                to="/notifications"
                className="font-semibold hover:underline px-4 py-2 transition duration-200 flex items-center relative"
              >
                <Bell className="w-4 h-4 mr-2" />
                {user && hasUnread && (
                  <span className="absolute top-1 left-4 w-2 h-2 bg-red-600 rounded-full animate-ping" />
                )}
                <span className="hidden md:inline">Notification</span>
              </Link>
            </>
          )}

          {/* Avatar Dropdown */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePicture ||
                      "https://github.com/shadcn.png"
                    }
                    className="cursor-pointer object-contain bg-gray-200"
                    alt="User"
                  />
                  <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePicture ||
                        "https://github.com/shadcn.png"
                      }
                      className="cursor-pointer object-contain bg-gray-200"
                    />
                    <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.name}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio
                        ? user.profile.bio.length > 20
                          ? user.profile.bio.slice(0, 20) + "..."
                          : user.profile.bio
                        : "No bio added yet"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-gray-700">
                  <Button asChild variant="link" className="justify-start px-0">
                    <Link to="/my-profile">
                      <User2 className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>

                  <Button
                    variant="link"
                    onClick={logoutHandler}
                    className="justify-start px-0 text-red-500"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-de_primary text-white hover:bg-purple-600">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav user={user} logoutHandler={logoutHandler} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
