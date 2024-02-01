import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { addJobDocs } from "../slices/Job_Docs";
import { Navbar } from "../component/Navbar";
export const Job_docs = () => {
  const [deadlineValue, setDeadlineValue] = useState("");
  const [deadline, setDeadline] = useState("");
  const [company_email, setCompany_Email] = useState("");
  const [wantApply, setWantApply] = useState("");
  //const [doc, setDoc] = useState(null);
  const [error, setError] = useState(null);

  const dateFunc = (e) => {
    const selectedDate = e.target.value; // The value from the date input

    if (selectedDate) {
      setDeadline(selectedDate); // Set the deadline directly as the selected date value
    }
  };

  /*const date= new Date(deadline)
  const formattedDate = date.toLocaleDateString();*/

  const dispatch = useDispatch();
  /* const handleFileChange = (event) => {
    setDoc(event.target.files[0]); 
  };*/

  /*useEffect(() => {
    console.log(doc);
  }, [doc]);*/
  const [cookies] = useCookies(["Email", "AuthToken"]);

  // Retrieve email from cookies
  const email = cookies.Email;

  const nav = useNavigate();
  //const jobInfo = useSelector((state) => state.jobInfos);
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
  const { description, job_type, work_Nature, web_link } = useSelector(
    (state) => state.jobDesc
  );

  const { rate, salary } = useSelector((state) => state.jobPay);

  const postJob = async (e) => {
    e.preventDefault();
    const jobDocs = {
      deadline,
      wantApply,
    };
    dispatch(addJobDocs(jobDocs));
    //nav("/");

    try {
      const response = await fetch("http://localhost:8000/jobsApi/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name,
          no_of_employees,
          employeer_name,
          employeer_email,
          company_email,
          employeer_Phone_no,
          title,
          location,
          description,
          rate,
          salary,
          job_type,
          work_Nature,
          deadline,
          email,
          industry,
          type,
          sub_type,
          web_link,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.detail) {
        setError(data.detail);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const navPageBackward = (e) => {
    e.preventDefault();
    nav("/Job_Pay");
  };

 /* console.log(
    company_name,
    no_of_employees,
    employeer_name,
    employeer_email,
    company_email,
    employeer_Phone_no,
    title,
    location,
    description,
    rate,
    salary,
    job_type,
    work_Nature,
    deadline,
    wantApply,
    email,
    industry,
    type,
    sub_type,
    web_link
  );*/
  return (
    <div className="main">
      <Navbar></Navbar>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <form>
          <input
            type="email"
            name="company_email"
            placeholder="Company Email"
            id="company_email"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:shadow-outline-blue"
            onChange={(event) => setCompany_Email(event.target.value)}
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Is There An Application Deadline?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="deadlineValue"
                  value="yes"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={(event) => setDeadlineValue(event.target.value)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="deadlineValue"
                  value="no"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={(event) => setDeadlineValue(event.target.value)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {deadlineValue === "yes" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold">
                Deadline
              </label>
              <input
                type="date"
                name="setDeadline"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline-blue"
                onChange={dateFunc}
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold">
              Want Resume/CV?
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wantApply"
                  value="yes"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={(event) => setWantApply(event.target.value)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="wantApply"
                  value="no"
                  className="form-radio h-4 w-4 text-blue-500"
                  onChange={(event) => setWantApply(event.target.value)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

         
        </form>

        <div className="flex justify-between mt-4">
          <button
            onClick={navPageBackward}
            className="bg-gray-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
          >
            Back
          </button>
          <button
            onClick={postJob}
            className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

/*
 {wantApply === "yes" ? (
          <>
            <label htmlFor="">
              Upload File
              <input
                type="file"
                name="doc"
                id="doc"
                onChange={handleFileChange}
              />
            </label>
          </>
        ) : (
          ""
        )}*/
