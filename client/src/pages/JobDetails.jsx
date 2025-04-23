import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import SuggestedJobs from "@/components/SuggestedJobs";
import { StopCircleIcon, Verified } from "lucide-react";

const JobDetails = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const isInitiallyApplied =
    user && singleJob?.applications?.some((app) => app.applicant === user._id);

  const [isApplied, setIsApplied] = useState(isInitiallyApplied || false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`/api/applications/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true);
        dispatch(
          setSingleJob({
            ...singleJob,
            applications: [...singleJob.applications, { applicant: user?._id }],
          })
        );
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`/api/job/get-job/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((app) => app.applicant === user?._id)
          );
        }
      } catch (error) {
        toast.error("Failed to load job");
      }
    };
    fetchSingleJob();
  }, [jobId, user, dispatch]);

  if (!user)
    return (
      <div className="text-center py-20 text-gray-600">
        Please login to view job details.
      </div>
    );

  return (
    <motion.div
      className="max-w-6xl mx-auto my-10 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  singleJob?.company?.logo || "https://github.com/shadcn.png"
                }
                alt="Company Logo"
                className="w-20 h-20 rounded-full object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-indigo-800">
                  {singleJob?.company?.name}
                </h1>
                <p className="hidden md:block md:text-sm md:text-gray-700 mt-1">
                  {singleJob?.company?.description ||
                    "No description provided."}
                </p>
                <a
                  className="text-sm text-blue-600 underline"
                  href={singleJob?.company?.website || "#"}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </div>
            </div>

            {user.role === "student" && (
              <motion.div whileHover={{ scale: isApplied ? 1 : 1.05 }}>
                <Button
                  onClick={!isApplied ? applyJobHandler : null}
                  disabled={isApplied}
                  className={`rounded-lg px-6 py-2 text-white transition ${
                    isApplied
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  }`}
                >
                  {isApplied ? "Already Applied" : "Apply Now"}
                </Button>
              </motion.div>
            )}
          </motion.div>

          <div className="flex gap-3 flex-wrap">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-transparent hover:text-inherit cursor-default">
              {singleJob?.position}
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-transparent hover:text-inherit cursor-default">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 hover:bg-transparent hover:text-inherit cursor-default">
              {singleJob?.location}
            </Badge>
            <Badge
              className={`${
                singleJob?.isRemote
                  ? "bg-teal-100 text-teal-800 hover:bg-transparent hover:text-inherit cursor-default"
                  : "bg-red-100 text-red-800 hover:bg-transparent hover:text-inherit cursor-default"
              }`}
            >
              {singleJob?.isRemote ? "Remote" : "On-site"}
            </Badge>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-de_primary p-1 ">
                {singleJob?.title}
              </h1>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-indigo-700">
                Job Description
              </h2>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 font-semibold ${
                  singleJob?.isActive
                    ? "text-green-600 border-green-500"
                    : "text-red-600 border-red-500"
                }`}
              >
                {singleJob?.isActive ? (
                  <Verified className="w-4 h-4" />
                ) : (
                  <StopCircleIcon className="w-4 h-4" />
                )}
                {singleJob?.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            <p>
              <span className="font-semibold text-indigo-900">
                Description:
              </span>{" "}
              {singleJob?.description}
            </p>
            <div>
              <span className="font-semibold text-indigo-900">
                Requirements:
              </span>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                {Array.isArray(singleJob?.requirements) ? (
                  singleJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))
                ) : (
                  <li>{singleJob?.requirements}</li>
                )}
              </ul>
            </div>
            <p>
              <span className="font-semibold text-indigo-900">Experience:</span>{" "}
              {singleJob?.experienceLevel}
            </p>
            <p>
              <span className="font-semibold text-indigo-900">Salary:</span> ₹{" "}
              {singleJob?.salary} LPA
            </p>
            <p>
              <span className="font-semibold text-indigo-900">Applicants:</span>{" "}
              {singleJob?.applications?.length > 0
                ? `${singleJob.applications.length} Applicant(s)`
                : "No applicants yet"}
            </p>
            <p>
              <span className="font-semibold text-indigo-900">Posted On:</span>{" "}
              {new Date(singleJob?.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <SuggestedJobs />
      </div>
    </motion.div>
  );
};

export default JobDetails;
