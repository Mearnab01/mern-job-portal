import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Bell, BriefcaseBusinessIcon, Home, LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = {
    name: "John Doe",
    role: "student", // or 'student'
    profile: {
      profilePhoto: "/user.jpg",
      bio: "HR Manager @ Microsoft",
    },
  };

  const handleLogout = () => {
    // Logout logic (API + Redux dispatch or context clear)
    navigate("/");
  };

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

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className="font-semibold hover:underline px-4 py-2 transition duration-200"
              >
                Companies
              </Link>
              <Link
                to="/admin/jobs"
                className="font-semibold hover:underline px-4 py-2 transition duration-200"
              >
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
                className="font-semibold hover:underline  px-4 py-2 transition duration-200 flex items-center"
              >
                <Bell className="w-4 h-4 mr-2" />
                <span className="hidden md:inline">Notification</span>
              </Link>
            </>
          )}

          {/* Avatar Dropdown */}
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="User" />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilePhoto} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.name}</h4>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 text-gray-700">
                  {user.role === "student" && (
                    <Button
                      asChild
                      variant="link"
                      className="justify-start px-0"
                    >
                      <Link to="/profile">
                        <User2 className="w-4 h-4 mr-2" />
                        View Profile
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="link"
                    onClick={handleLogout}
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
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-de_primary text-white hover:bg-purple-600">
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
