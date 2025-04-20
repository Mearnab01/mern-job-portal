import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedJobs } from "@/redux/jobSlice";

const SuggestedJobs = () => {
  //const [suggestedJobs, setSuggestedJobs] = useState([]);
  const { suggestedJobs } = useSelector((store) => store.job);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSuggestedJobs = async () => {
      try {
        const res = await axios.get(`/api/job/suggested/${jobId}`);
        if (res.data.success) {
          dispatch(setSuggestedJobs(res.data.job));
          //console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching suggested jobs:", error);
        toast.error(error.response.data.message);
      }
    };

    fetchSuggestedJobs();
  }, [jobId]);

  return (
    <aside className="w-full lg:w-[300px] bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Suggested Jobs
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {suggestedJobs?.length > 0 ? (
          suggestedJobs.map((job) => (
            <Link to={`/details/${job._id}`} key={job._id}>
              <div
                key={job._id}
                className="border p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <h3 className="font-semibold text-gray-900 text-lg">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {job.company.name || "Unknown Company"}
                </p>
                <p className="text-xs text-gray-400">{job.location}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">{job.salary}LPA</span>
                  <span className="text-xs text-gray-500 ml-2">
                    | {job.experienceLevel} | {job.jobType}
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500">No job suggestions available.</p>
        )}
      </div>
    </aside>
  );
};

export default SuggestedJobs;
