import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const LatestJobCard = () => {
  return (
    <div className="cursor-pointer shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
      <Card className="p-4">
        <CardContent className="space-y-4">
          {/* Company Logo & Name */}
          <div className="flex items-center gap-3 border border-green-400 rounded-full p-1">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/promotion.png" alt="Company Logo" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Microsoft India
            </h2>
          </div>

          {/* Job Title & Description */}
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Software Engineer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              Looking for an experienced developer to join our team...
            </p>
          </div>

          {/* Badges (Job Type, Remote, etc.) */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">Featured</Badge>
            <Badge variant="warning">Remote</Badge>
            <Badge variant="primary">Full-time</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestJobCard;
