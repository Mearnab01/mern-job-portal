import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="bg-gradient-to-t from-[#babaff] to-white dark:from-gray-800 dark:to-gray-900 min-h-[80vh] overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto my-20 px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
        </h1>
        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length > 0 ? (
            allJobs.slice(0, 6).map((job) => {
              return <LatestJobCard key={job._id} job={job} />;
            })
          ) : (
            <div className="flex items-center text-center text-gray-500 dark:text-gray-400 py-10">
              <span className="text-5xl mb-2">❌</span>
              <p className="text-xl font-medium">No jobs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJob;
