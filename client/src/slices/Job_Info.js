import { createSlice } from "@reduxjs/toolkit";

export const jobInfoSlice = createSlice({
  name: "jobInfos",
  initialState: {},
  reducers: {
    addJobInfo: (state, action) => {
       return {...state, ...action.payload};
    },
  },
});

export const { addJobInfo } = jobInfoSlice.actions;

export default jobInfoSlice.reducer;
