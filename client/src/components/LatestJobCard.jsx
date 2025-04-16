import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const LatestJobCard = ({ job }) => {
  const { title, description, jobType, location, position, company } = job;

  return (
    <div className="cursor-pointer shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
      <Card className="p-4">
        <CardContent className="space-y-4">
          {/* Company Logo & Name */}
          <div className="flex items-center gap-3 border border-green-400 rounded-full p-1">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={company?.logo || "/default-company.png"}
                alt="Company Logo"
              />
              <AvatarFallback>
                {company?.name ? company.name.slice(0, 2).toUpperCase() : "CO"}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {company?.name || "Unknown Company"}
            </h2>
          </div>

          {/* Job Title & Description */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {title || "Untitled Role"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {description || "No description provided..."}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {jobType && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {jobType}
              </span>
            )}
            {location && (
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {location}
              </span>
            )}
            {position && (
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {position}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestJobCard;
