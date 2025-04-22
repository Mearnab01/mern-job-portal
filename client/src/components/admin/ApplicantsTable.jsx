import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { MoreHorizontal, FileText } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const [resumeURL, setResumeURL] = useState("");
  const { applicants, searchApplicantsByText } = useSelector(
    (store) => store.application
  );
  const appliedBy = applicants.applications;
  const [filterApplicants, setFilterApplicants] = useState(appliedBy);

  useEffect(() => {
    const query = searchApplicantsByText?.toLowerCase() || "";

    const filtered = appliedBy?.filter((student) => {
      const name = student?.applicant?.fullname?.toLowerCase() || "";
      const email = student?.applicant?.email?.toLowerCase() || "";
      return query === "" || name.includes(query) || email.includes(query);
    });

    setFilterApplicants(filtered);
  }, [appliedBy, searchApplicantsByText]);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `/api/applications/status-update/${id}`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Status updated");
        setFilterApplicants((prev) =>
          prev.map((app) =>
            app._id === id ? { ...app, status: status.toLowerCase() } : app
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    if (status === "accepted") return "bg-green-200 text-green-800";
    if (status === "rejected") return "bg-red-200 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getRowBg = (status) => {
    if (status === "accepted") return "bg-green-50 border-l-4 border-green-400";
    if (status === "rejected") return "bg-red-50 border-l-4 border-red-400";
    return "bg-yellow-50 border-l-4 border-yellow-400";
  };

  return (
    <div className="overflow-x-auto rounded-xl border shadow-sm">
      <Table>
        <TableCaption>Recent applicants to your job posting</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterApplicants?.length > 0 ? (
            filterApplicants.map((item) => {
              const status = item.status?.toLowerCase() || "pending";

              return (
                <TableRow key={item._id} className={getRowBg(status)}>
                  <TableCell>{item.applicant.fullname}</TableCell>
                  <TableCell>{item.applicant.email}</TableCell>
                  <TableCell>{item.applicant.phoneNumber}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <span
                          className="text-blue-600 flex items-center gap-2 cursor-pointer"
                          onClick={() =>
                            setResumeURL(item.applicant.profile.resume)
                          }
                        >
                          <FileText className="w-4 h-4" />
                          {item.applicant.profile.resumeOriginalName}
                        </span>
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl w-full">
                        <DialogTitle>Resume Preview</DialogTitle>
                        <div className="w-full h-[75vh]">
                          <embed
                            src={resumeURL}
                            type="application/pdf"
                            className="w-full h-full rounded border"
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>{item.appliedAt.split("T")[0]}</TableCell>
                  <TableCell>
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(
                        status
                      )}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="cursor-pointer" />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((statusOption, i) => (
                          <div
                            key={i}
                            onClick={() =>
                              statusHandler(statusOption, item._id)
                            }
                            className="cursor-pointer py-1 hover:bg-gray-100 rounded px-2"
                          >
                            {statusOption}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan="7"
                className="text-center text-muted-foreground"
              >
                No applicant found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
