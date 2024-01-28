import {createSlice} from "@reduxjs/toolkit";

export const jobDescSlice= createSlice({
    name: "jobDecs",
    initialState: {},
    reducers:{
        addJobDesc: (state, action)=>{
            return{ ...state, ...action.payload};
        }
    }
})

export const { addJobDesc } = jobDescSlice.actions;

export default jobDescSlice.reducer;