import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user || user.role !== "recruiter") return;
    const fetchAllCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API}/companies`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
        //console.log(setCompanies(res.data.companies));
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "failed to get companies");
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
