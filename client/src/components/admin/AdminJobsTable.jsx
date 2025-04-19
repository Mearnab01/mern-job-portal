import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { JOB_API } from "@/utils/constant";
import { setAllAdminJobs, setAllJobs } from "@/redux/jobSlice";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  //console.log(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  const handleDelete = async (jobId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this job?"
      );
      if (!confirm) return;

      const res = await axios.delete(`${JOB_API}/delete`, {
        data: { id: jobId },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Job deleted successfully!");
        const updated = await axios.get(`${JOB_API}/admin-jobs`, {
          withCredentials: true,
        });

        dispatch(setAllAdminJobs(updated.data.jobs));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="overflow-x-auto rounded-2xl border"
    >
      <Table>
        <TableCaption className="text-gray-500 text-sm">
          📄 A list of your recent posted jobs
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center py-6 text-gray-400">
                😕 No matching jobs found
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={job?.company.logo}
                    className="w-14 h-14 rounded-full object-contain"
                  />

                  {job?.company?.name}
                </TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button>
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:text-primary"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Applicants</span>
                      </div>
                      <div
                        onClick={() => handleDelete(job._id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600 hover:underline mt-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AdminJobsTable;
