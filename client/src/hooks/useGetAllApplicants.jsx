import { setAllApplicants } from "@/redux/applicationSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllApplicants = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllApplications = async () => {
      try {
        const res = await axios.get(`/api/applications/${id}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplications();
  }, [dispatch, id]);
};

export default useGetAllApplicants;
