import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menu,
  Home,
  BriefcaseBusinessIcon,
  Bell,
  User2,
  LogOut,
} from "lucide-react";
import { setUser } from "@/redux/authSlice";
import { USER_API } from "@/utils/constant";
import axios from "axios";
import toast from "react-hot-toast";

const MobileNav = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // manually control Sheet

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close sheet on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      toast.error(error.response?.data?.message || "Failed to Logout user!");
    }
  };

  if (!isClient) return null;

  return (
    <div className="md:hidden py-3 px-4 flex justify-between items-center shadow-sm">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[250px] sm:w-[300px] bg-gradient-to-br from-white via-gray-50 to-de_primary/10"
        >
          <div className="flex flex-col gap-4 mt-6">
            {user && (
              <div className="flex flex-col items-center gap-3 border-b pb-4">
                <Avatar className="w-16 h-16 border-2 shadow-sm">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className="font-semibold text-base">{user?.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 mt-4">
              {user?.role === "recruiter" ? (
                <>
                  <Link to="/admin/companies" className="hover:underline">
                    Companies
                  </Link>
                  <Link to="/admin/jobs" className="hover:underline">
                    Jobs
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-4 h-4" /> Home
                  </Link>
                  <Link to="/jobs" className="flex items-center gap-2">
                    <BriefcaseBusinessIcon className="w-4 h-4" /> Jobs
                  </Link>
                  <Link to="/notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" /> Notifications
                  </Link>
                </>
              )}

              {user ? (
                <>
                  {user.role === "student" && (
                    <Link to="/my-profile" className="flex items-center gap-2">
                      <User2 className="w-4 h-4" /> Profile
                    </Link>
                  )}

                  <Button
                    onClick={logoutHandler}
                    className="bg-de_primary hover:bg-purple-600 text-white flex items-center gap-2 mt-4"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="w-full bg-de_primary text-white hover:bg-purple-600">
                      Signup
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
