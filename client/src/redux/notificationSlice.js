import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotifications: (state, action) => {
      if (typeof action.payload === "function") {
        state.notifications = action.payload(state.notifications);
      } else {
        state.notifications = action.payload;
      }
    },
  },
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
