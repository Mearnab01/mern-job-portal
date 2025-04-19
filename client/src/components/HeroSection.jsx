import React, { useState } from "react";
import Spline from "@splinetool/react-spline";
import Searchbar from "./Searchbar";

const HeroSection = () => {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <div className="h-[60vh] grid grid-cols-1 lg:grid-cols-2 items-center bg-gradient-to-b from-[#babaff] to-white dark:from-gray-800 dark:to-gray-900 px-6 lg:px-12 text-center lg:text-left">
      {/* Left Section - Text & Search */}
      <div className="flex flex-col justify-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          Apply and Find Your <br />
          <span className="text-[#6A38C2]">Dream Job</span> Today!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Discover top job opportunities that match your skills and aspirations.
        </p>

        {/* Search Bar */}
        <Searchbar />
      </div>

      {/* Right Section - Spline Model with Loader */}
      <div className="hidden lg:flex justify-center items-center relative">
        {!isSplineLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Simple Loading Animation */}
            <div className="w-16 h-16 border-t-4 border-[#9a6efe] border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <Spline
          scene="https://prod.spline.design/hXpjAMXrs53srfmC/scene.splinecode"
          onLoad={() => setIsSplineLoaded(true)}
          className={`${
            !isSplineLoaded ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500`}
        />
      </div>
    </div>
  );
};

export default HeroSection;
