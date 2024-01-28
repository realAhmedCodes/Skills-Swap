import { createSlice } from "@reduxjs/toolkit";

export const searchJobSlice = createSlice({
  name: "searchJob",
  initialState: {},
  reducers: {
    addsearchJob: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addsearchJob } = searchJobSlice.actions;

export default searchJobSlice.reducer;
