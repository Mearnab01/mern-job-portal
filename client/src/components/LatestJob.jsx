import React from "react";
import LatestJobCard from "./LatestJobCard";

const LatestJob = () => {
  return (
    <div className="bg-gradient-to-t from-[#babaff] to-white dark:from-gray-800 dark:to-gray-900 min-h-[80vh] overflow-hidden">
      {/* Heading */}
      <div className="max-w-7xl mx-auto my-20 px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          <span className="text-[#6a38c2]">Latest & Top</span> Job Openings
        </h1>
        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <LatestJobCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestJob;
