import React, { useEffect, useState } from "react";
import styles from "../styles/ViewJob.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";
export const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/applyApi/apply`
        );
        if (response.ok) {
          const data = await response.json();
          setCandidates(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCandidates();
  }, []);

  const deleteBtn = async (id) => {
    try {
      const deletePost = await axios.delete(
        `http://localhost:8000/appliedApi/appliedJobs${id}`
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className={styles.jobs_div}>
        {candidates.map((candidate) => (
          <div className={styles.Grid_div} key={candidate.name}>
            <p>Id: {candidate.job_id}</p>
            <p>Title: {candidate.email}</p>

          

            <button onClick={() => deleteBtn(candidate.name)}>
              Remove From List
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
