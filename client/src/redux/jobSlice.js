import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
  name: "jobSlice",
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
    suggestedJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSuggestedJobs: (state, action) => {
      state.suggestedJobs = action.payload;
    },
  },
});
export const {
  setAllJobs,
  setAllAdminJobs,
  setSingleJob,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setSuggestedJobs,
} = jobSlice.actions;
export default jobSlice.reducer;
