import React, { useState, useEffect } from 'react'
import { Navbar } from "../component/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addJobDesc } from '../slices/Job_Desc';

export const Job_Desc = () => {
  const [description, setDescription] = useState("");
  const [job_type, setJobType] = useState("On-site");
  const [work_Nature, setWorkNature] = useState("Full-time");
  const [webLink, setWebLink] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(description);
  }, [description]);
  const nav = useNavigate();

  const navPageForward = (e) => {
    e.preventDefault();
    const jobDecs = {
      description,
      job_type,
      work_Nature,
      web_link: webLink,
    };
    dispatch(addJobDesc(jobDecs));
    nav("/Job_Pay");
  };
  const navPageBackward = (e) => {
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

  /*console.log(
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
  );*/
  
  return (
    <div className="main">
      <Navbar></Navbar>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Enter Job Description
        </label>
        <textarea
          name="postContent"
          rows={8}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:shadow-outline-blue"
          placeholder="Provide a detailed job description..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Job Type
          </label>
          <select
            name="job_Type"
            id="job_Type"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="On-site">On Site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-1">
            Work Nature
          </label>
          <select
            name="work_Nature"
            id="work_Nature"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
            onChange={(e) => setWorkNature(e.target.value)}
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <input
          type="text"
          id="web_Link"
          name="web_Link"
          placeholder="Web Link"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:shadow-outline-blue"
          onChange={(e) => setWebLink(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={navPageBackward}
            className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
          >
            Back
          </button>
          <button
            onClick={navPageForward}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};