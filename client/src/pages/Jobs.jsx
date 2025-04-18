import React, { useState } from "react";
import FilterCard from "@/components/FilterCard";
import Job from "@/components/Job";
import { motion } from "framer-motion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import MobileFilterCard from "@/responsive/MobileFilterCard";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const totalPages = Math.ceil(allJobs.length / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Sidebar Filter - Only Desktop */}
          <aside className="hidden sm:block sm:w-1/4 sticky top-24 self-start max-h-[calc(100vh-6rem)] overflow-y-auto custom-scroll">
            <FilterCard />
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Available Jobs
            </h2>

            {/* Mobile Filter - Only Mobile */}
            <div className="sm:hidden mb-6">
              <MobileFilterCard />
            </div>

            {allJobs.length === 0 ? (
              <div className="text-center text-gray-600 mt-10">
                <p className="text-lg font-medium">🔍 No jobs found</p>
                <p className="text-sm mt-2">
                  Try a different filter or keyword
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentJobs.map((job) => (
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

                {/* Pagination Controls */}
                <Pagination className="mt-8">
                  <PaginationContent className="justify-center">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={handlePrev}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    <PaginationItem className="px-4 py-2 text-sm font-medium text-gray-700">
                      Page {currentPage} of {totalPages}
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={handleNext}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
