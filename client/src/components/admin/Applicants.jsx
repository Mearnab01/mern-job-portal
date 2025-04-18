import React, { useEffect, useState } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import axios from "axios";
import { APPLICATION_API } from "@/utils/constant";
import { useParams } from "react-router-dom";
import {
  setAllApplicants,
  setSearchApplicantsByText,
} from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";

const Applicants = () => {
  const { searchApplicantsByText } = useSelector((store) => store.application);
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  //console.log(applicants.applications);

  const { id } = useParams();
  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/${id}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplications();
  }, []);
  const [filteredApplicants, setFilteredApplicants] = useState(applicants);

  useEffect(() => {
    if (!applicants?.applications) return;

    const filtered = applicants.applications.filter((application) => {
      const name = application?.applicant?.fullname?.toLowerCase() || "";
      const email = application?.applicant?.email?.toLowerCase() || "";
      const search = searchApplicantsByText?.toLowerCase() || "";

      return name.includes(search) || email.includes(search);
    });

    setFilteredApplicants(filtered);
  }, [applicants, searchApplicantsByText]);

  const handleExportCSV = () => {
    const csv = applicants.applications
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
        {applicants.applications.length === 0 ? (
          "Not applied yet"
        ) : (
          <>🧑‍💻 Applicants ({applicants.applications.length})</>
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
          onChange={(e) => setSearchApplicantsByText(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={!applicants.applications?.length}
        >
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
        <ApplicantsTable appliedBy={filteredApplicants} />
      </motion.div>
    </div>
  );
};

export default Applicants;
