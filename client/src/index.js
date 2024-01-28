import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from "@reduxjs/toolkit";
import  jobInfoSlice  from './slices/Job_Info';
import jobDescSlice from './slices/Job_Desc';
import   jobPaySlice from './slices/Job_Pay';
import jobDocsSlice  from './slices/Job_Docs';
import  searchJobSlice  from './slices/Search_Job';
import  userValuesSlice  from './slices/userValues';
import { Provider } from "react-redux";
import './index.css';
import App from './App';


const store = configureStore({
  reducer: {
    jobInfos: jobInfoSlice,
    jobDesc: jobDescSlice,
    jobPay: jobPaySlice,
    jobDocs: jobDocsSlice,
    searchJob: searchJobSlice,
    userValues: userValuesSlice,
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
   
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

