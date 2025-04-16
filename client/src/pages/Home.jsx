import CategoryCarousel from "@/components/CategoryCarousel";
import HeroSection from "@/components/HeroSection";
import LatestJob from "@/components/LatestJob";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import React from "react";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
    </div>
  );
};

export default Home;
