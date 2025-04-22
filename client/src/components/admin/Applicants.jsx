import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { setSearchApplicantsByText } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import useGetAllApplicants from "@/hooks/useGetAllApplicants";

const Applicants = () => {
  const { id } = useParams();
  useGetAllApplicants(id);
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const [searchApplicant, setSearchApplicant] = useState("");
  const appliedBy = applicants?.applications || [];
  // console.log(applicants);
  useEffect(() => {
    dispatch(setSearchApplicantsByText(searchApplicant));
  }, [searchApplicant]);

  const handleExportCSV = () => {
    const csv = appliedBy
      .map((a) => {
        const { fullname, email, phoneNumber } = a.applicant;
        const { resume } = a.applicant.profile;
        return `${fullname},${email},${resume},${phoneNumber}`;
      })
      .join("\n");

    const blob = new Blob(["Name,Email,Resume,Phone\n" + csv], {
      type: "text/csv",
    });

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
        {appliedBy.length === 0 ? (
          "Not applied yet"
        ) : (
          <>🧑‍💻 Applicants ({appliedBy.length || ""})</>
        )}
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
          onChange={(e) => setSearchApplicant(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={!appliedBy?.length}
        >
          <Download className="w-4 mr-2" />
          Export CSV
        </Button>
      </motion.div>

      {appliedBy.length === 0 ? (
        <p className="text-gray-500 text-center">No one has applied yet 🥲</p>
      ) : (
        <motion.div
          className="bg-white shadow-md rounded-xl p-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ApplicantsTable applicants={appliedBy} />
        </motion.div>
      )}
    </div>
  );
};

export default Applicants;
