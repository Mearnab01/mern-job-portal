import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    // You can integrate this with your mutation logic or API service
    console.log("Company to be created:", companyName);
    // navigate(`/admin/companies/${newlyCreatedCompanyId}`);
  };

  return (
    <div>
      <Navbar />
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
          <Button onClick={handleCreate} disabled={!companyName.trim()}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
