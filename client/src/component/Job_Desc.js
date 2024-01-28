import React, { useState, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addJobDesc } from '../slices/Job_Desc';

export const Job_Desc = () => {
  

    const [description, setDescription] = useState("")
    const [job_type, setJobType] = useState("On-site");
    const [work_Nature, setWorkNature] = useState("Full-time");
    const[ webLink, setWebLink ]= useState("")

const dispatch= useDispatch()
     useEffect(() => {
       //console.log(description);
     }, [description]);
     const nav= useNavigate()

     const navPageForward=(e)=>{
       e.preventDefault();
      const jobDecs = {
        description,
        job_type,
        work_Nature,
       web_link: webLink,
      };
      dispatch(addJobDesc(jobDecs))
         nav("/Job_Pay");

     }
     const navPageBackword = (e) => {
       e.preventDefault();
       nav("/Job_Info");
     };
       const {
         company_name,
         employeer_name,
         employeer_email,
         employeer_Phone_no,
         title,
         location,
         no_of_employees,
         industry,
         type,
         sub_type,
       } = useSelector((state) => state.jobInfos);

       console.log(
         company_name,
         employeer_name,
         employeer_email,
         employeer_Phone_no,
         title,
         location,
         no_of_employees,
         industry,
         type,
         sub_type
       );
  return (
    <>
      <label>Enter Description</label>
      <textarea
        name="postContent"
        rows={20}
        cols={120}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />

      <select
        name="job_Type"
        id="job_Type"
        onChange={(e) => {
          setJobType(e.target.value);
        }}
      >
        <option value="On-site"> On Site</option>
        <option value="Remote"> Remote</option>
        <option value="Hybrid"> Hybrid</option>
      </select>

      <select
        name="work_Nature"
        id="work_Nature"
        onChange={(e) => {
          setWorkNature(e.target.value);
        }}
      >
        <option value="Full-time"> Full-time</option>
        <option value="Part-time"> Part-time</option>
        <option value="Freelance"> Freelance</option>
      </select>

      <input
        type="text"
        id="web_Link"
        name="web_Link"
        placeholder="Web Link"
        onChange={(e) => {
          setWebLink(e.target.value);
        }}
      />
      <button onClick={navPageForward}>Next</button>
      <button onClick={navPageBackword}>Back</button>
    </>
  );
}

