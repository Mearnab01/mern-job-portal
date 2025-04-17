import React, { useState, useEffect } from "react";
import { Contact, Mail, User2, ScanEye } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import UpdateProfile from "@/components/UpdateProfile";
import AppliedJobTable from "@/components/AppliedJobTable";
import { setUser } from "@/redux/authSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [imagePreview, setImagePreview] = useState(
    user?.profile?.profilePicture || "https://github.com/shadcn.png"
  );
  useEffect(() => {
    if (user?.profile?.profilePicture) {
      setImagePreview(user.profile.profilePicture);
    }
  }, [user?.profile?.profilePicture]);

  const isResume = !!user?.profile?.resume && user?.profile?.resumeOriginalName;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Left Side - Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
          <Avatar className="w-40 h-40 mb-4">
            <AvatarImage
              src={imagePreview} // Image preview state used here
              alt="profile"
              className="rounded-full object-contain bg-gray-200"
            />
          </Avatar>
          <h1 className="text-2xl font-semibold mb-1">{user.fullname}</h1>
          <div className="flex flex-col gap-2 w-full text-left text-sm mt-4">
            <div className="flex items-center gap-2 read-only:bg-gray-200">
              <Mail className="h-4 w-4 text-gray-600" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="h-4 w-4 text-gray-600" />
              <span>{user.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="h-4 w-4 text-gray-600" />
              <strong className="m-2 text-de_primary">{user.role}</strong>
            </div>
            <div className="flex items-center gap-2">
              <UpdateProfile user={user} setUser={setUser} />
            </div>
          </div>
        </div>

        {/* Right Side - Details + Update */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Skills & Resume */}
          {user?.role === "student" && (
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {user?.profile?.skills?.length > 0 ? (
                  user.profile.skills.map((skill, idx) => {
                    const colors = [
                      "bg-blue-100 text-blue-800",
                      "bg-green-100 text-green-800",
                      "bg-yellow-100 text-yellow-800",
                      "bg-purple-100 text-purple-800",
                      "bg-pink-100 text-pink-800",
                      "bg-red-100 text-red-800",
                    ];
                    const colorClass = colors[idx % colors.length];
                    return (
                      <div
                        key={idx}
                        className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}
                      >
                        {skill}
                      </div>
                    );
                  })
                ) : (
                  <span className="text-gray-400 italic">
                    Add your skills (e.g: web dev, ai-ml..)
                  </span>
                )}
              </div>

              {/* Resume */}
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <div className="text-md font-bold">Resume</div>
                {isResume ? (
                  <a
                    href={user.profile?.resume}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {user.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span className="text-gray-400 italic">Add your resume</span>
                )}
              </div>
            </div>
          )}

          {/* Update Bio Section (Full Width) */}
          <div className="bg-white p-6 rounded-2xl shadow-md w-full">
            <h2 className="text-lg font-semibold mb-4">Bio</h2>
            {user?.profile?.bio ? (
              <span className="text-gray-700 text-sm">{user.profile.bio}</span>
            ) : (
              <span className="text-gray-400 italic">Add your bio</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      {user.role === "student" && (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10">
          <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
          <AppliedJobTable />
        </div>
      )}
    </div>
  );
};

export default Profile;
