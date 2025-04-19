import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { filterData } from "@/demoData";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useSearchParams } from "react-router-dom";
import { Checkbox } from "./ui/checkbox";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue((prevValue) => (prevValue === value ? "" : value));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));

    if (selectedValue === "") {
      setSearchParams({ keyword: "" });
    } else {
      setSearchParams({ keyword: selectedValue });
    }
  }, [selectedValue, dispatch, setSearchParams]);

  useEffect(() => {
    const keywordFromURL = searchParams.get("keyword");
    if (keywordFromURL) {
      setSelectedValue(keywordFromURL);
    }
  }, [searchParams]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-md border">
      <h1 className="font-semibold text-xl mb-4 text-gray-800">
        🔍 Filter Jobs
      </h1>
      <div className="space-y-6">
        {filterData.map((section, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              {section.icon}
              <h2 className="text-lg font-semibold text-gray-700">
                {section.filterType}
              </h2>
            </div>
            {section.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div
                  key={itemId}
                  className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors cursor-pointer"
                >
                  <Checkbox
                    id={itemId}
                    checked={selectedValue === item}
                    onCheckedChange={() => changeHandler(item)}
                    className="border-blue-500"
                  />
                  <Label htmlFor={itemId} className="text-gray-600">
                    {item}
                  </Label>
                </div>
              );
            })}
            <hr className="mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
