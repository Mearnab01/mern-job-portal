import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Searchbar = () => {
  const { searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchedQuery.trim() === "") return;
    navigate(`/jobs?keyword=${searchedQuery}`);
    dispatch(setSearchedQuery(""));
  };

  return (
    <form
      onSubmit={searchHandler}
      className="flex w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-full shadow-md overflow-hidden"
    >
      <Input
        type="text"
        value={searchedQuery}
        onChange={(e) => dispatch(setSearchedQuery(e.target.value))}
        placeholder="Search jobs, companies..."
        className="flex-grow px-4 py-3 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none"
      />
      <Button
        type="submit"
        className="bg-[#9a6efe] dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-[#8758f0] dark:hover:bg-blue-800 transition-all"
      >
        Search
      </Button>
    </form>
  );
};

export default Searchbar;
