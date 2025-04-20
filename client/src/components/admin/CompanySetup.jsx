import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY_API } from "@/utils/constant";
import axios from "axios";
import { toast } from "react-hot-toast";

const CompanySetup = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);

  // Optional: pre-fill form if editing an existing company
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`/api/company/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const { name, description, website, location } = res.data.company;
          setInput((prev) => ({
            ...prev,
            name,
            description,
            website,
            location,
          }));
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch company details");
      }
    };

    if (id) fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <Button
          type="button"
          onClick={() => navigate("/admin/companies")}
          variant="outline"
          className="flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl border rounded-2xl p-6 grid gap-6"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              value={input.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={input.website}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={input.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Update Company Info"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanySetup;
