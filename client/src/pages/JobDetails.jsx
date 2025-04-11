import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const JobDetails = () => {
  const singleJob = {
    title: "Frontend Developer",
    postion: 2,
    jobType: "Full Time",
    salary: 12,
    location: "Remote",
    description:
      "We're looking for a skilled React developer to join our team and build scalable web applications.",
    experience: 2,
    applications: ["user1", "user2"],
    createdAt: new Date().toISOString(),
    company: "TechNova Pvt Ltd",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png",
  };

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = () => {
    setIsApplied(true);
    alert("✅ Successfully applied for the job!");
  };

  const suggestedJobs = [
    { title: "React Developer", company: "CodeLabs", location: "Remote" },
    { title: "UI Designer", company: "PixelSoft", location: "Bangalore" },
    { title: "Fullstack Engineer", company: "Webify", location: "Mumbai" },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 space-y-8">
      {/* Main Job Details */}
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center gap-4">
            <img
              src={singleJob.logo}
              alt="Company Logo"
              className="w-14 h-14 rounded-md object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {singleJob?.title}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{singleJob.company}</p>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: isApplied ? 1 : 1.05 }}
            className="mt-6 md:mt-0"
          >
            <Button
              onClick={!isApplied ? applyJobHandler : null}
              disabled={isApplied}
              className={`rounded-lg px-6 py-2 text-white ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </motion.div>
        </div>

        {/* Tags */}
        <div className="flex gap-3 flex-wrap">
          <Badge variant="outline" className="text-blue-700 font-medium">
            {singleJob?.postion} Position{singleJob?.postion > 1 && "s"}
          </Badge>
          <Badge variant="outline" className="text-red-600 font-medium">
            {singleJob?.jobType}
          </Badge>
          <Badge variant="outline" className="text-purple-700 font-medium">
            ₹ {singleJob?.salary} LPA
          </Badge>
          <Badge variant="outline" className="text-green-700 font-medium">
            {singleJob?.location}
          </Badge>
        </div>

        {/* Job Description */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold border-b pb-3 mb-6 text-gray-800">
            Job Description
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Description:</span>{" "}
              {singleJob?.description}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Experience:</span>{" "}
              {singleJob?.experience} yrs
            </p>
            <p>
              <span className="font-semibold text-gray-900">Salary:</span> ₹{" "}
              {singleJob?.salary} LPA
            </p>
            <p>
              <span className="font-semibold text-gray-900">Applicants:</span>{" "}
              {singleJob?.applications?.length || 0}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Posted On:</span>{" "}
              {new Date(singleJob?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Jobs - below main details */}
      <aside className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Suggested Jobs</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {suggestedJobs.map((job, index) => (
            <div
              key={index}
              className="border p-3 rounded-lg hover:shadow transition cursor-pointer"
            >
              <h3 className="font-semibold text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
              <p className="text-xs text-gray-400">{job.location}</p>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default JobDetails;
