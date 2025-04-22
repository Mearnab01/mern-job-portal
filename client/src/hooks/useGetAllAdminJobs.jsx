import { setAllAdminJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`/api/job/admin-jobs`, {
          withCredentials: true,
        });
        console.log(res.data.jobs);

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        } else {
          toast.error("Failed to fetch jobs");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
