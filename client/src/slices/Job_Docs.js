import { createSlice } from "@reduxjs/toolkit";

export const jobDocsSlice = createSlice({
  name: "jobDocs",
  initialState: {},
  reducers: {
    addJobDocs: (state, action) => {
      return {...state, ...action.payload}
    },
  },
});

export const { addJobDocs } = jobDocsSlice.actions;

export default jobDocsSlice.reducer;
