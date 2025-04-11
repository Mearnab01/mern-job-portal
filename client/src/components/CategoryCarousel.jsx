import React from "react";
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
  "Soil Test Engineer",
  "Technical Support Engineer",
];

const CategoryCarousel = () => {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 my-10">
      <Carousel className="max-w-6xl mx-auto">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem
              key={index}
              className="w-[85%] sm:basis-1/2 lg:basis-1/3 mx-auto px-2"
            >
              <Button
                variant="outline"
                className="w-full rounded-full text-center hover:bg-de_primary hover:text-white transition-all duration-300 ease-out text-sm sm:text-base"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
