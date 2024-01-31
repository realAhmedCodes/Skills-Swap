import React, { useEffect, useState } from "react";
import styles from "../styles/ViewJob.module.css";
import { Navbar } from "../component/Navbar";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import axios from "axios";
export const ShowSavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [cookies] = useCookies(["Email", "AuthToken"]);
const [email, setEmail] = useState("");
  



useEffect(() => {
  const token = window.sessionStorage.getItem("token");

  if (typeof token === "string" && token.length > 0) {
    try {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      const userRole = decodedToken.role;
      const userId = decodedToken.user_id;
     
      setEmail(userEmail);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  } else {
    console.error("Invalid token or token not found");
  }
}, []);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/savedJobsApi/savedJobs/${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setSavedJobs(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [email]);

const deleteBtn = async (id) => {
  try {
    await axios.delete(`http://localhost:8000/savedJobsApi/savedJobs/${id}`);
    await axios.put(`http://localhost:8000/jobsApi/jobs/${id}`, {
      saved_status: false,
    });

   
    setSavedJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== id));
  } catch (err) {
    console.log(err);
  }
  window.location.reload()
};
console.log(savedJobs)



  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.jobs_div}>
        {savedJobs.map((savedJob) => (
          <div className={styles.Grid_div} key={savedJob.job_id}>
            <p>Id: {savedJob.job_id}</p>
            <p>Title: {savedJob.location}</p>

            <p>Company Name: {savedJob.company_name}</p>
            <button onClick={() => deleteBtn(savedJob.job_id)}>
              Remove From List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
