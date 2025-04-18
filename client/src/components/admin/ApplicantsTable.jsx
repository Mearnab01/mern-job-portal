import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  // Access the applicants and search text from the Redux store
  const { applicants } = useSelector((store) => store.application);

  // Ensure applicants is an array (fallback to empty array if undefined)
  const applications = applicants?.applications || [];

  const [resumeURL, setResumeURL] = useState("");

  const statusHandler = (status, id) => {
    console.log(`Status for ${id}:`, status);
    // Mock status update logic
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Render applicants only if it's an array */}
          {applications.map((item) => (
            <TableRow key={item.applicant._id}>
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
                  <DialogContent className="max-w-4xl w-full h-[80vh]">
                    <DialogTitle>Resume Preview</DialogTitle>
                    <iframe
                      src={resumeURL}
                      title="Resume PDF"
                      className="w-full h-full rounded border"
                    />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{item.appliedAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, i) => (
                      <div
                        key={i}
                        onClick={() => statusHandler(status, item._id)}
                        className="cursor-pointer py-1 hover:bg-gray-100 rounded px-2"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
