import { createSlice } from "@reduxjs/toolkit";


export const jobPaySlice = createSlice({
  name: "jobPay",
  initialState: {},
  reducers: {
    addJobPay: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const { addJobPay } = jobPaySlice.actions;

export default jobPaySlice.reducer;