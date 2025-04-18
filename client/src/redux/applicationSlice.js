import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: null,
    searchApplicantsByText: "",
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
    setSearchApplicantsByText: (state, action) => {
      state.searchApplicantsByText = action.payload;
    },
  },
});
export const { setAllApplicants, setSearchApplicantsByText } =
  applicationSlice.actions;
export default applicationSlice.reducer;
