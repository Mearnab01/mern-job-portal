import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const useGetAllJobs = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    const fetchAllJobs = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get("keyword") || "";

        const res = await axios.get(`/api/job/all-jobs`, {
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
