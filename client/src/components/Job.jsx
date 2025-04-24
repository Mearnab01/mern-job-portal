import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return null;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();

    const currentDateString = currentTime.toLocaleDateString();
    const createdAtDateString = createdAt.toLocaleDateString();

    if (currentDateString === createdAtDateString) return 0;

    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };
  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <p className="text-sm text-gray-500">
          {daysAgo === 0
            ? "Today"
            : daysAgo === null
            ? "Invalid date"
            : `${daysAgo} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark size={18} />
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-0">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-16 h-16 object-cover rounded-full border border-gray-200 bg-white">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
          <div>
            <h1 className="font-medium text-base">{job?.company?.name}</h1>
            <p className="text-sm text-gray-500">{job?.company?.location}</p>
          </div>
        </div>

        <CardTitle className="text-lg font-bold mb-1 truncate">
          {job?.title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm truncate">
          {job?.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="outline" className="text-blue-700 font-semibold">
            {job?.position}
          </Badge>
          <Badge variant="outline" className="text-[#F83002] font-semibold">
            {job?.jobType}
          </Badge>
          <Badge variant="outline" className="text-[#7209b7] font-semibold">
            {job?.salary} LPA
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex gap-4 mt-4 p-4 pt-2">
        <Button
          onClick={() => navigate(`/details/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5c078f]">
          Save For Later
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Job;
