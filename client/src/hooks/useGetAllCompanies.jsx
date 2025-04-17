import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
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
      }
    };
    fetchAllCompanies();
  }, []);
};

export default useGetAllCompanies;
