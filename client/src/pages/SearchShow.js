import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/ViewJob.module.css";

export const SearchShow = () => {
  const { searchTitle, searchLocation } = useParams();
  const nav = useNavigate();
  const [searchJobTitle, setSearchJobTitle] = useState("");
  const [searchJobLocation, setSearchJobLocation] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://localhost:8000/jobsApi/";

        if (searchTitle && searchLocation) {
          url += `searchJobs/${searchTitle}/${searchLocation}`;
        } else if (searchTitle) {
          url += `searchJobs/${searchTitle}`;
        } else if (searchLocation) {
          url += `searchJobsLocation/${searchLocation}`;
        }

        const responseData = await fetch(url);
        const jobsData = await responseData.json();
        setSearchedData(jobsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [searchTitle, searchLocation]);

  const searchBtn = async () => {
    try {
      let url = "http://localhost:8000/jobsApi/";

      if (searchJobTitle && searchJobLocation) {
        url += `searchJobs/${searchJobTitle}/${searchJobLocation}`;
      } else if (searchJobTitle) {
        url += `searchJobs/${searchJobTitle}`;
      } else if (searchJobLocation) {
        url += `searchJobsLocation/${searchJobLocation}`;
      }

      const responseData = await fetch(url);
      const jobsData = await responseData.json();
      setSearchedData(jobsData);

      let searchPath = "";

      if (searchJobTitle && searchJobLocation) {
        searchPath = `/SearchJobs/${encodeURIComponent(
          searchJobTitle
        )}/${encodeURIComponent(searchJobLocation)}`;
      } else if (searchJobTitle && !searchJobLocation) {
        searchPath = `/SearchJobs/${encodeURIComponent(searchJobTitle)}`;
      } else if (!searchJobTitle && searchJobLocation) {
        searchPath = `/SearchJobsLocation/${encodeURIComponent(
          searchJobLocation
        )}`;
      }

      if (searchPath) {
        nav(searchPath);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const detailPage = (job_id) => {
    nav(`/DetailJob/${job_id}`);
  };

  return (
    <div className={styles.main_div}>
      <input
        type="text"
        id="searchJobTitle"
        name="searchJobTitle"
        placeholder="Enter Job Title"
        value={searchJobTitle}
        onChange={(e) => {
          setSearchJobTitle(e.target.value);
        }}
      />

      <input
        type="text"
        id="searchJobLocation"
        name="searchJobLocation"
        placeholder="Enter Location"
        value={searchJobLocation}
        onChange={(e) => {
          setSearchJobLocation(e.target.value);
        }}
      />

      <button onClick={searchBtn}>Search</button>

      <div className={styles.jobs_div}>
        {searchedData.map((job) => (
          <div
            className={styles.Grid_div}
            key={job.job_id}
            onClick={() => {
              detailPage(job.job_id);
            }}
          >
            <p>Id: {job.job_id}</p>
            <p>Title: {job.title}</p>
            <p>Company Name: {job.company_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/*<div className={styles.jobs_div}>
        {jobs.map((job) => (
          <div className={styles.Grid_div} key={job.job_id}>
            <p>Id: {job.job_id}</p>
            <p>Title: {job.title}</p>
            <p>Company Name: {job.company_name}</p>
          </div>
        ))}
      </div>*/
