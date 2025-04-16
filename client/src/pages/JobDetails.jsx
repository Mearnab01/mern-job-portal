import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API } from "@/utils/constant";
const JobDetails = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  console.log(singleJob);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API}/get-job/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
        // console.log(dispatch(setSingleJob(res.data.job)));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id, dispatch]);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
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
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* Main Layout: Stacked on mobile, side-by-side on md+ */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side - Main Job Details */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-4">
              <img
                //src={singleJob.logo || "https://github.com/shadcn.png"}
                src={"https://github.com/shadcn.png"}
                alt="Company Logo"
                className="w-14 h-14 rounded-md object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {singleJob?.company?.name}
                </h1>
                <p className="text-sm text-gray-600 mt-1"></p>
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
              <p>{singleJob?.position}</p>
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
                <span className="font-semibold text-gray-900">
                  Description:
                </span>{" "}
                {singleJob?.description}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Experience:</span>
                {singleJob?.experienceLevel} level
              </p>
              <p>
                <span className="font-semibold text-gray-900">Salary:</span> ₹{" "}
                {singleJob?.salary} LPA
              </p>
              <p>
                <span className="font-semibold text-gray-900">Applicants:</span>{" "}
                {singleJob?.applications?.length === 0
                  ? "Not applied by anyone yet"
                  : `${singleJob?.applications?.length} Applicant${
                      singleJob?.applications?.length > 1 ? "s" : ""
                    }`}
              </p>

              <p>
                <span className="font-semibold text-gray-900">Posted On:</span>{" "}
                {new Date(singleJob?.createdAt).toLocaleDateString() || "now"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Suggested Jobs */}
        <aside className="w-full lg:w-[300px] bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Suggested Jobs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
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
    </div>
  );
};

export default JobDetails;
