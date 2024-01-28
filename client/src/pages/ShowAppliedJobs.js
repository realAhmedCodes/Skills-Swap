import React, { useEffect, useState } from "react";
import styles from "../styles/ViewJob.module.css";
import { useCookies } from "react-cookie";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import axios from "axios";
export const ShowAppliedJobs = () => {
  const [appliedJobs, setappliedJobs] = useState([]);
  const [email, setEmail]= useState("")
 




   useEffect(() => {
     const token = window.sessionStorage.getItem("token");
    
     try {
       if (token) {
         const decodedToken = jwtDecode(token);
         const userEmail = decodedToken.email;
       
         setEmail(userEmail);
       }
     } catch (error) {
       if (error instanceof InvalidTokenError) {
         console.error("Invalid token");
       }
     }
   }, []);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/appliedApi/appliedJobs/${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setappliedJobs(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJobs();
  }, [email]);

  const deleteBtn =async(id) => {
    
    try {
      const deletePost = await axios.delete(
        `http://localhost:8000/appliedApi/appliedJobs/${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={styles.jobs_div}>
        {appliedJobs.map((appliedJob) => (
          <div className={styles.Grid_div} key={appliedJob.job_id}>
            <p>Id: {appliedJob.job_id}</p>
            <p>Title: {appliedJob.title}</p>

            <p>Company Name: {appliedJob.company_name}</p>

            <button onClick={() => deleteBtn(appliedJob.job_id)}>
              Remove From List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
