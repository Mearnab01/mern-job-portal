import React from "react";
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

// Sample data — replace this with your real data later
const sampleAppliedJobs = [
  {
    _id: "1",
    createdAt: "2025-04-01T12:00:00Z",
    status: "pending",
    job: { title: "Frontend Developer", company: { name: "Tech Corp" } },
  },
  {
    _id: "2",
    createdAt: "2025-04-02T12:00:00Z",
    status: "accepted",
    job: { title: "React Engineer", company: { name: "CodeBase" } },
  },
  {
    _id: "3",
    createdAt: "2025-04-03T12:00:00Z",
    status: "rejected",
    job: { title: "UI/UX Designer", company: { name: "Designify" } },
  },
];

const statusColors = {
  pending: "bg-gray-100 text-gray-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AppliedJobTable = () => {
  if (sampleAppliedJobs.length === 0) {
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
          {sampleAppliedJobs.map((job) => {
            const { _id, createdAt, status, job: jobDetails } = job;
            const date = createdAt.split("T")[0];
            const badgeColor =
              statusColors[status] || "bg-gray-200 text-gray-800";

            return (
              <TableRow key={_id} className="hover:bg-gray-50 transition">
                <TableCell>{date}</TableCell>
                <TableCell className="font-medium text-gray-800">
                  {jobDetails.title}
                </TableCell>
                <TableCell>{jobDetails.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`rounded-full px-3 py-1 text-sm font-medium ${badgeColor}`}
                  >
                    {status.toUpperCase()}
                  </Badge>
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
