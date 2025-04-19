import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API } from "@/utils/constant";
import toast from "react-hot-toast";
import { setAllAppliedJobs } from "@/redux/jobSlice";
import { Trash2 } from "lucide-react";

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  //console.log(allAppliedJobs);

  const handleDeleteApplication = async (applicationId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this application?"
      );
      if (!confirm) return;

      const res = await axios.delete(`${APPLICATION_API}/delete-rejected`, {
        data: { applicationId },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message || "Application deleted");

        const updated = await axios.get(`${APPLICATION_API}/get`, {
          withCredentials: true,
        });

        dispatch(setAllAppliedJobs(updated.data.job));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete application.");
    }
  };

  if (!allAppliedJobs || allAppliedJobs.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm border rounded-xl bg-white shadow-sm">
        <p className="mb-2">You haven’t applied to any jobs yet.</p>
        <p>Start applying to see them show up here!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <Table>
        <TableCaption className="text-sm text-muted-foreground mb-2">
          Track all your job applications here.
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-600">Date</TableHead>
            <TableHead className="font-semibold text-gray-600">
              Job Role
            </TableHead>
            <TableHead className="font-semibold text-gray-600">
              Company
            </TableHead>
            <TableHead className="font-semibold text-gray-600 text-right">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((job) => {
            const { _id, createdAt, status, job: jobDetails } = job;
            const date = createdAt.split("T")[0];
            const badgeColor =
              statusColors[status] || "bg-gray-200 text-gray-800";
            const companyName = jobDetails?.company?.name || "N/A";
            const logo = jobDetails?.company?.logo;

            return (
              <TableRow key={_id} className="hover:bg-gray-50 transition">
                <TableCell>{date}</TableCell>
                <TableCell className="font-medium text-gray-800">
                  {jobDetails?.title || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      {logo && (
                        <img
                          src={logo}
                          alt={companyName}
                          className="w-full h-full rounded-full object-contain border border-de_primary bg-white"
                        />
                      )}
                    </div>
                    <span>{companyName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}
                  >
                    {status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  {status === "rejected" && (
                    <button
                      onClick={() => handleDeleteApplication(_id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete rejected application"
                    >
                      <Trash2 className="text-red-700 m-2" />
                    </button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
