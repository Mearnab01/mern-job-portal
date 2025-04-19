import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAppliedJob = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllAppliedJobs();
  }, []);
};

export default useGetAllAppliedJob;
