import React, { useEffect, useState } from "react";
import styles from "../styles/ViewJob.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export const JobDetail = () => {
   const { job_id } = useParams();
   const { webLink } = useSelector((state) => state.jobDesc);
   

  //const job_id = window.sessionStorage.getItem("Job_id");
  const [job, setJob] = useState({});
  const [currentId, setJobRecord] = useState(job_id);
  const excludedFields = ["created_at", "job_id", "updated_at"];
useEffect(() => {
  console.log("dddd", job_id);
}, [job_id]);


  const nav= useNavigate()
  const GetTitleData = window.sessionStorage.getItem("searchTitle");
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobsApi/Detailjobs/${currentId}`
        );
        const responseData = await response.json();

        // Check if the response contains the actual job data
        if (responseData && responseData.rows && responseData.rows.length > 0) {
          const jobData = responseData.rows[0]; // Assuming the job details are in the 'rows' array

          // Now, set the job details to the state
          setJob(jobData);
        }
      } catch (err) {
        console.error(err);
        // Handle errors if fetch or parsing fails
      }
    };
    fetchData();
  });

  const applyPage = () => {
   nav(`/Applyjob/${currentId}`);
  };

  const savedBtn=()=>{

  }
  return (
    <div>

      <div className={styles.jobsDeatil_div}>
        <button onClick={savedBtn}>Saved Btn</button>
        <button onClick={applyPage}>Apply</button>
        {Object.entries(job).map(([key, value]) => {
          const uppercaseKey = key.toUpperCase().replace("_", " ");
          return (
            !excludedFields.includes(key) && (
              <div key={key}>{`${uppercaseKey} : ${value}`}</div>
            )
          );
        })}
      </div>
    </div>
  );
};
