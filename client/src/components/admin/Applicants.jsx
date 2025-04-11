import React, { useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const dummyApplicants = [
  {
    _id: "1",
    name: "Rohit Sharma",
    email: "rohit@example.com",
    resume: "https://example.com/resume1.pdf",
  },
  {
    _id: "2",
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    resume: "https://example.com/resume2.pdf",
  },
  {
    _id: "3",
    name: "Vikram Patel",
    email: "vikram@example.com",
    resume: "https://example.com/resume3.pdf",
  },
];

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants] = useState(dummyApplicants);

  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    const csv = filteredApplicants
      .map((a) => `${a.name},${a.email},${a.resume}`)
      .join("\n");
    const blob = new Blob(["Name,Email,Resume\n" + csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "applicants.csv";
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🧑‍💻 Applicants ({filteredApplicants.length})
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Input
          className="w-full sm:max-w-xs"
          placeholder="Search by name or email"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline" onClick={handleExportCSV}>
          <Download className="w-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      <motion.div
        className="bg-white shadow-md rounded-xl p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ApplicantsTable applicants={filteredApplicants} />
      </motion.div>
    </div>
  );
};

export default Applicants;
