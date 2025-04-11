import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import { motion } from "framer-motion";

const AdminJobs = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Manage Jobs</h2>
            <p className="text-gray-500 text-sm mt-1">
              Search or create new job posts
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-fit"
          >
            ➕ Create Job
          </Button>
        </div>

        {/* Search & Table Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-4 sm:p-6"
        >
          {/* Search Input */}
          <div className="mb-6">
            <Input
              className="w-full sm:w-1/2"
              placeholder="🔍 Filter by job title, company name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* Job Table */}
          <AdminJobsTable searchQuery={input} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
