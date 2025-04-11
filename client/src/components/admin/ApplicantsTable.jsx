import React, { useState } from "react";
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

const shortlistingStatus = ["Accepted", "Rejected"];

const dummyApplicants = [
  {
    _id: "a1",
    fullname: "Aryan Verma",
    email: "aryan@example.com",
    phoneNumber: "+91-9876543210",
    createdAt: "2025-04-11T08:00:00Z",
    resume: "https://example.com/resume1.pdf",
    resumeName: "Aryan_Resume.pdf",
  },
  {
    _id: "a2",
    fullname: "Divya Iyer",
    email: "divya@example.com",
    phoneNumber: "+91-9876501234",
    createdAt: "2025-04-09T10:30:00Z",
    resume: "https://example.com/resume2.pdf",
    resumeName: "Divya_CV.pdf",
  },
];

const ApplicantsTable = () => {
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
          {dummyApplicants.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.fullname}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phoneNumber}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <span
                      className="text-blue-600 flex items-center gap-2 cursor-pointer"
                      onClick={() => setResumeURL(item.resume)}
                    >
                      <FileText className="w-4 h-4" />
                      {item.resumeName}
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
              <TableCell>{item.createdAt.split("T")[0]}</TableCell>
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
