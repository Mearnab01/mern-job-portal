import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get("keyword") || "";

        const res = await axios.get(`${JOB_API}/all-jobs`, {
          params: { keyword },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Failed to fetch jobs:", error.message);
      }
    };

    fetchAllJobs();
  }, [location.search]);
};

export default useGetAllJobs;
