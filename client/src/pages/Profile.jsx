import React, { useState } from "react";
import { Contact, Mail } from "lucide-react";
import UpdateProfile from "@/components/UpdateProfile";
import AppliedJobTable from "@/components/AppliedJobTable";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    bio: "Frontend Developer passionate about building beautiful interfaces.",
    skills: ["React", "JavaScript", "CSS", "Tailwind"],
    resume: "https://example.com/resume.pdf",
    resumeOriginalName: "John_Doe_Resume.pdf",
    profilePhoto: "https://github.com/shadcn.png",
  });

  const isResume = !!user.resume;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Left Side - Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 mb-4">
            <AvatarImage src={user.profilePhoto} alt="profile" />
          </Avatar>
          <h1 className="text-2xl font-semibold mb-1">{user.name}</h1>
          <p className="text-gray-500 text-sm mb-3">{user.bio}</p>
          <div className="flex flex-col gap-2 w-full text-left text-sm mt-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Contact className="h-4 w-4 text-gray-600" />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Details + Update */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Skills & Resume */}
          {/* Skills & Resume */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.skills.length > 0 ? (
                user.skills.map((skill, idx) => {
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
                    <Badge
                      key={idx}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}
                    >
                      {skill}
                    </Badge>
                  );
                })
              ) : (
                <span>NA</span>
              )}
            </div>

            {/* Resume */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-md font-bold">Resume</Label>
              {isResume ? (
                <a
                  href={user.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {user.resumeOriginalName}
                </a>
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          {/* Update Profile Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Update Profile</h2>
            <UpdateProfile user={user} setUser={setUser} />
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-10">
        <h1 className="font-bold text-lg mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
    </div>
  );
};

export default Profile;
