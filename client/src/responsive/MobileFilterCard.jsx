import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { filterData } from "@/demoData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const MobileFilterCard = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (type) => {
    setOpenSections((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-md border max-w-full mx-auto">
      <h1 className="font-semibold text-xl mb-4 text-gray-800">
        🔍 Filter Jobs
      </h1>
      <RadioGroup className="space-y-4">
        {filterData.map((section, index) => {
          const isOpen = openSections[section.filterType] || false;
          return (
            <div key={index} className="space-y-2">
              <div
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleSection(section.filterType)}
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <h2 className="text-lg font-semibold text-gray-700">
                    {section.filterType}
                  </h2>
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>

              {isOpen && (
                <div className="space-y-2">
                  {section.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`;
                    return (
                      <div
                        key={itemId}
                        className="flex items-center space-x-3 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors cursor-pointer"
                      >
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          className="border-blue-500 data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor={itemId} className="text-gray-600">
                          {item}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
              <hr className="mt-3" />
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default MobileFilterCard;
