import React from "react";
import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import { motion } from "framer-motion";
import { filterJobs } from "@/demoData";
const Jobs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-1/4 sticky top-24 self-start">
            <FilterCard />
          </aside>

          {/* Jobs Grid */}
          <main className="flex-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Available Jobs
            </h2>
            {filterJobs.length <= 0 ? (
              <div className="text-center text-gray-600 mt-10">
                <p className="text-lg font-medium">🔍 No jobs found</p>
                <p className="text-sm mt-2">
                  Try a different filter or keyword
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      duration: 0.5,
                    }}
                    key={job._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
