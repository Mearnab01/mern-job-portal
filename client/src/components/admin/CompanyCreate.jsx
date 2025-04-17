import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { COMPANY_API } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreateCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API}/register-company`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);

      if (res.data.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-bold text-2xl sm:text-3xl">Your Company Name</h1>
          <p className="text-muted-foreground mt-1">
            What would you like to call your company? You can change this later.
          </p>
        </div>

        <div className="mb-6">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            placeholder="JobHunt, Microsoft, etc."
            className="mt-2"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
