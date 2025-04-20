import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { JOB_API } from "@/utils/constant";
import toast from "react-hot-toast";
import axios from "axios";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    isActive: true,
    isRemote: false,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`/api/job/post-job`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      //console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);

      toast.error("failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-200">
      <div className="flex items-center justify-center w-full px-4 py-10">
        <form
          onSubmit={submitHandler}
          className="w-full bg-gray-100 max-w-4xl border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
            🚀 Post a New Job
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="e.g. Frontend Developer"
                value={input.title}
                onChange={changeEventHandler}
                required
                className="peer"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="e.g. React, Node.js, MongoDB"
                value={input.requirements}
                onChange={changeEventHandler}
                required
                className="peer"
              />
            </div>
            <div>
              <Label>Salary(In LPA)</Label>
              <Input
                type="text"
                name="salary"
                placeholder="e.g. ₹5 LPA - ₹10 LPA"
                value={input.salary}
                onChange={changeEventHandler}
                required
                className="peer"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Bangalore, Remote"
                value={input.location}
                onChange={changeEventHandler}
                required
                className="peer"
              />
            </div>

            <div>
              <Label>Job Type</Label>
              <Select
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, jobType: value }))
                }
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Select
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, experienceLevel: value }))
                }
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="entry">Entry</SelectItem>
                    <SelectItem value="mid">Mid</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="m-2">Position</Label>
              <Input
                type="text"
                name="position"
                placeholder="e.g. Python Developer"
                maxLength={20}
                value={input.position}
                onChange={changeEventHandler}
                required
                className="peer"
              />
              <span className="text-xs text-gray-500">
                {input.position.length}/20 characters
              </span>
            </div>
            <div>
              <Label className="m-2">Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm text-red-600 mt-2">
                  * No companies found. Please register one before posting a
                  job.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 mt-8">
            <div className="flex items-center gap-4">
              <Label htmlFor="isActive" className="text-gray-600">
                Is Active
              </Label>
              <Switch
                id="isActive"
                checked={input.isActive}
                onCheckedChange={(value) =>
                  setInput((prev) => ({ ...prev, isActive: value }))
                }
              />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="isRemote" className="text-gray-600">
                Is Remote
              </Label>
              <Switch
                id="isRemote"
                checked={input.isRemote}
                onCheckedChange={(value) =>
                  setInput((prev) => ({ ...prev, isRemote: value }))
                }
              />
            </div>
          </div>

          <div className="m-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              placeholder="Job responsibilities, team, etc."
              value={input.description}
              onChange={changeEventHandler}
              required
              className="peer"
            />
          </div>

          {loading ? (
            <Button
              className="mt-10 bg-blue-600 hover:bg-blue-700 w-fit px-6 py-2"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting Job...
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-10 bg-blue-600 hover:bg-blue-700 w-fit px-6 py-2"
            >
              Post Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="text-sm text-center text-red-600 mt-4 font-medium">
              * Please register a company before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
