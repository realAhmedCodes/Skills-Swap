import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { addJobDocs } from "../slices/Job_Docs";

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
    sub_type
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
  const navPageBackword = (e) => {
    e.preventDefault();
    nav("/Job_Pay");
  };

  console.log(
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
  );
  return (
    <div className="main_div">
      <form action="">
        <input
          type="email"
          name="company_email"
          placeholder="Company Email"
          id="company_email"
          onChange={(event) => setCompany_Email(event.target.value)}
        />
        <label>Is There An Application Deadline?</label>
        <label htmlFor="deadlineValue">
          Yes
          <input
            type="radio"
            name="deadlineValue"
            id="deadlineValue"
            value="yes"
            placeholder=""
            onChange={(event) => setDeadlineValue(event.target.value)}
          />
        </label>
        <label htmlFor="deadlineValue">
          No
          <input
            type="radio"
            name="deadlineValue"
            id="deadlineValue"
            placeholder=""
            value="no"
            onChange={(event) => setDeadlineValue(event.target.value)}
          />
        </label>
        {deadlineValue === "yes" ? (
          <>
            <label htmlFor="setDeadline">Deadine </label>
            <input
              type="date"
              name="setDeadline"
              placeholder=" Enter Deadline"
              id="setDeadline"
              onChange={dateFunc}
            />
          </>
        ) : (
          ""
        )}

        <label>Want Resume/CV ?</label>
        <label htmlFor="wantApply">
          Yes
          <input
            type="radio"
            name="wantApply"
            id="wantApply"
            value="yes"
            placeholder=""
            onChange={(event) => setWantApply(event.target.value)}
          />
        </label>
        <label htmlFor="wantApply">
          No
          <input
            type="radio"
            name="wantApply"
            id="wantApply"
            placeholder=""
            value="no"
            onChange={(event) => setWantApply(event.target.value)}
          />
        </label>
        {wantApply === "yes" ? (
          <>
            <button>Apply</button>
          </>
        ) : (
          ""
        )}
      </form>
      <button onClick={postJob}>Post</button>
      <button onClick={navPageBackword}>Back</button>
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
