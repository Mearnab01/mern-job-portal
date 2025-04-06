import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel.jsx";
import { Button } from "./ui/button.jsx";

const categories = [
  "Front-end Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analysis",
  "Graphic Designer",
  "DevOps Engineer",
  "UX/UI Designer",
  "Mobile App Developer",
  "Cybersecurity Analyst",
  "Cloud Engineer",
  "Product Manager",
  "Business Analyst",
  "Machine Learning Engineer",
  "Database Administrator",
  "QA Tester",
  "Soil Test Engineer ",
  "Technical Support Engineer",
];
const CategoryCarousel = () => {
  return (
    <Carousel className="w-full max-w-[45rem] mx-auto my-20">
      <CarouselContent>
        {categories.map((category, index) => (
          <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
            <Button
              variant="outline"
              className="text-center w-full rounded-full hover:bg-de_primary hover:text-white transition-all duration-300 ease-out"
            >
              {category}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategoryCarousel;
