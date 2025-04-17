import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API, JOB_API } from "@/utils/constant";
import toast from "react-hot-toast";
import SuggestedJobs from "@/components/SuggestedJobs";

const JobDetails = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const isInitiallyApplied =
    user &&
    singleJob?.applications?.some(
      (application) => application.applicant === user._id
    );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied || false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API}/get-job/${jobId}`, {
          withCredentials: true,
        });
        //console.log(dispatch(setSingleJob(res.data.job)));

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(response.data.error.message);
      }
    };
    fetchSingleJob();
  }, [jobId, user?._id, dispatch]);

  if (!user) {
    return (
      <div className="text-center text-gray-600 py-20">
        Please login to view job details.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center gap-4">
              <img
                src={"https://github.com/shadcn.png"}
                alt="Company Logo"
                className="w-14 h-14 rounded-md object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {singleJob?.company?.name}
                </h1>
              </div>
            </div>

            {user.role === "student" && (
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
            )}
          </div>

          {/* Tags */}
          <div className="flex gap-3 flex-wrap">
            <Badge variant="outline" className="text-blue-700 font-medium">
              {singleJob?.position}
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
                <span className="font-semibold text-gray-900">Experience:</span>{" "}
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
                {new Date(singleJob?.updatedAt).toLocaleDateString() || "now"}
              </p>
            </div>
          </div>
        </div>

        {/* Suggested Jobs */}
        <SuggestedJobs />
      </div>
    </div>
  );
};

export default JobDetails;
