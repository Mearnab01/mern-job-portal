import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const dummyCompanies = [
  {
    id: "c1",
    name: "Tata Consultancy Services",
    location: "Mumbai",
    industry: "IT Services",
    createdAt: "2025-04-01",
  },
  {
    id: "c2",
    name: "Infosys",
    location: "Bengaluru",
    industry: "Software",
    createdAt: "2025-03-20",
  },
  {
    id: "c3",
    name: "Zomato",
    location: "Gurugram",
    industry: "Food Tech",
    createdAt: "2025-02-15",
  },
];

const Companies = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredCompanies = dummyCompanies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-[300px]"
            placeholder="Filter by company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/companies/create")}>
            + New Company
          </Button>
        </div>
        <CompaniesTable companies={filteredCompanies} />
      </div>
    </div>
  );
};

export default Companies;
