import { createSlice } from "@reduxjs/toolkit";

export const userValuesSlice = createSlice({
  name: "userValues",
  initialState: {},
  reducers: {
    addUserValues: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addUserValues } = userValuesSlice.actions;

export default userValuesSlice.reducer;
