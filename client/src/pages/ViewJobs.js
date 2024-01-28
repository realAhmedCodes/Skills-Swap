import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import { SearchShow } from "./SearchShow";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { Navbar } from "../component/Navbar";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { addsearchJob } from "../slices/Search_Job";

import { useNavigate } from "react-router-dom";
export const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [firstJobRecord, setFirstJobRecord] = useState({});
  const [detailJob, setDetailJob] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [status, setStatus] = useState(false);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [firstJobId, setFirstJobId] = useState("");
  const [currentId, setCurrentId] = useState("");
  const excludedFields = ["created_at", "job_id", "updated_at"];
  const [cookies] = useCookies(["Email", "AuthToken"]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [role, setRole] = useState("");
  const [user_id, setId] = useState(null);
  const [email, SetEmail] = useState("");
  const [matchedJobs, setMatchedJobs] = useState([]);
  // Retrieve email from cookies
  //const userEmail = cookies.Email;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 0.2,
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const nav = useNavigate();
  const token = window.sessionStorage.getItem("token");

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");

    if (typeof token === "string" && token.length > 0) {
      try {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        const userRole = decodedToken.role;
        const userId = decodedToken.user_id;
        setId(userId);
        setRole(userRole);
        SetEmail(userEmail);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.error("Invalid token or token not found");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobsApi/jobs?page=${page}&pageSize=${pageSize}`
        );

        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    const fetchFirstJob = async () => {
      try {
        const response = await fetch("http://localhost:8000/jobsApi/firstJob");
        const firstJobData = await response.json();
        setFirstJobRecord(firstJobData);

        //setFirstJobId(firstJobData.job_id);
        setCurrentId(firstJobData.job_id);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch only if firstJobRecord is empty
    if (Object.keys(firstJobRecord).length === 0) {
      fetchFirstJob();
    }
    //fetchFirstJob();
  }, [firstJobRecord]); // Run only when firstJobRecord changes

  
console.log(role)
  useEffect(() => {
    const fetchMatchedJobs = async () => {
      try {
        if (user_id !== null) {
          // Fetch similar jobs only if user_id exists
          const response = await fetch(
            "http://localhost:8001/similar_job_titles"
          );
          const matchedJobsData = await response.json();
          setMatchedJobs(matchedJobsData.similar_job_info);
        }
      } catch (error) {
        console.error("Error fetching matched jobs:", error);
      }
    };

    fetchMatchedJobs();
  }, [user_id]); 

  const show = async (id) => {
    setOpen(true);
    try {
      const response = await fetch(
        `http://localhost:8000/jobsApi/Detailjobs/${id}`
      );
      const responseData = await response.json();
      setFirstJobRecord(responseData.rows[0]);

      const statusResponse = await fetch(
        `http://localhost:8000/savedJobsApi/jobStatus/${id}`
      );
      const statusResponseValue = await statusResponse.json();

      const savedStatus = statusResponseValue.rows[0].saved_status;

      if (status !== savedStatus) {
        setStatus(savedStatus);
      }

      setCurrentId(id);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(user_id);
  const dispatch = useDispatch();

  const searchBtn = async (e) => {
    e.preventDefault();

    let searchPath = "";

    if (searchTitle && searchLocation) {
      searchPath = `/SearchJobs/${encodeURIComponent(
        searchTitle
      )}/${encodeURIComponent(searchLocation)}`;
    } else if (searchTitle && !searchLocation) {
      searchPath = `/SearchJobs/${encodeURIComponent(searchTitle)}`;
    } else if (!searchTitle && searchLocation) {
      searchPath = `/SearchJobsLocation/${encodeURIComponent(searchLocation)}`;
    }

    if (searchPath) {
      nav(searchPath);
    }
  };

  const saveBtn = async () => {
    setStatus(!status);
    try {
      setStatus(true);
      const response = await fetch(
        "http://localhost:8000/savedJobsApi/savedJobs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            job_id: currentId,
          }),
        }
      );

      const responseStatus = await axios.put(
        `http://localhost:8000/jobsApi/jobs/${currentId}`,
        {
          saved_status: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const unSaveBtn = async () => {
    try {
      setStatus(false);
      const response = await axios.delete(
        `http://localhost:8000/savedJobsApi/savedJobs/${currentId}`
      );

      const responseStatus = await axios.put(
        `http://localhost:8000/jobsApi/jobs/${currentId}`,
        {
          saved_status: false,
        }
      );
      //setStatus(false);
    } catch (err) {
      console.log(err);
    }
  };
  const applyPage = (currentId) => {
    nav(`/Applyjob/${currentId}`);
    console.log(currentId);
  };

  const nextPage = async () => {
    setPage(page + 1);
  };

  const prevPage = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
return (
  <div className="bg-white-100">
    <Navbar />
    <div className="p-4 flex justify-between">
      <button
        onClick={nextPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Next Jobs
      </button>
      <button
        onClick={prevPage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Prev Jobs
      </button>
    </div>
    <input
      type="text"
      id="searchTitle"
      name="searchTitle"
      placeholder="Enter Job Title"
      onChange={(e) => {
        setSearchTitle(e.target.value);
      }}
      className="border rounded-md px-2 py-1 m-2"
    />

    <input
      type="text"
      id="searchLocation"
      name="searchLocation"
      placeholder="Enter Location"
      onChange={(e) => {
        setSearchLocation(e.target.value);
      }}
      className="border rounded-md px-2 py-1 m-2"
    />

    <button
      onClick={searchBtn}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
    >
      Search
    </button>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <h1 className="text-xl font-bold mb-2">Latest Jobs</h1>
      {jobs.map((job) => (
        <div
          key={job.job_id}
          onClick={() => {
            show(job.job_id);
          }}
          className="border rounded-md p-2 cursor-pointer hover:bg-gray-200"
        >
          <p>{job.title}</p>
          <p>{job.company_name}</p>
          <p>{job.location}</p>
        </div>
      ))}
    </div>

    {role === "user" ? (
      <>
        <div className="p-4">
          <h1 className="text-xl font-bold mb-2">Recommended Jobs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {matchedJobs.map((matchedJob) => (
              <div
                key={matchedJob.title}
                onClick={() => {
                  show(matchedJob.job_id);
                }}
                className="border rounded-md p-2 cursor-pointer hover:bg-gray-200"
              >
                <p>Title: {matchedJob.title}</p>
                <p>Company: {matchedJob.company_name}</p>
                <p>Location: {matchedJob.location}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      ""
    )}

    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="bg-white rounded-md p-4">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              sx={{
                textAlign: "center",
                fontSize: "0.8rem",
                padding: "6px",
              }}
            >
              <div className="text-center">
                {role === "user" ? (
                  <>
                    {status === false ? (
                      <>
                        <button
                          onClick={saveBtn}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={unSaveBtn}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                          Unsave
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
                {Object.entries(firstJobRecord).map(([key, value]) => {
                  const uppercaseKey = key.toUpperCase().replace("_", " ");
                  if (!excludedFields.includes(key)) {
                    return <div key={key}>{`${uppercaseKey} : ${value} `}</div>;
                  }
                })}
                {role === "user" ? (
                  <>
                    <button
                      onClick={() => applyPage(currentId)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                      Apply
                    </button>
                  </>
                ) : (
                  ""
                )}
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  </div>
);
};

/*
 
 
  <h2>Recommended Jobs:</h2>
        <div className={styles.jobs_div}>
          {recommendedJobs && recommendedJobs.length > 0 ? (
            recommendedJobs.map((job, index) => (
              <li key={index}>{job.Job_Title}</li>
            ))
          ) : (
            <li>No recommended jobs available</li>
          )}
        </div>


 try {
        const response = await axios.get(
          `http://localhost:8001/recommend_jobs/31`
        );
        setRecommendedJobs(response.data); // Assuming the response contains recommended jobs data
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }*/
/* <div className={styles.jobsDeatil_div}>
<div key={key}>{value.title==="App"?(<><button>BTN</button></>): ("")} </div>
        {Object.entries(firstJobRecord).map(([key, value]) => (
          <div key={firstJobRecord.job_id}>
            <div>{value}</div>
          </div>
        ))}
      </div>
      
       {sendData && (
     
          <SearchShow
            title={searchTitle}
            location={searchLocation}
          ></SearchShow>
       
      ) }*/

/*const searchBtn = async() => {
   try {
       const responseData = await fetch(
         `http://localhost:8000/jobsApi/searchJobs/${searchTitle}/${searchLocation}`
       );
       const jobsData = await responseData.json();
       setSearchedData(jobsData)
      
     } catch (err) {
       console.log(err);
     }
};*/

/*const dispatch = useDispatch();
  const searchBtn = async (e) => {
    e.preventDefault();
    const searchJob = {
      searchTitle,
      searchLocation,
    };
    dispatch(addsearchJob(searchJob));
    nav("/SearchShow");
  };*/

/*import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/ViewJob.module.css";
import { SearchShow } from "./SearchShow";



import { addsearchJob } from "../slices/Search_Job";
import { useNavigate } from "react-router-dom";
export const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [firstJobRecord, setFirstJobRecord] = useState({});
  const [detailJob, setDetailJob] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [status, setStatus] = useState(false);

  const[ firstJobId, setFirstJobId]=useState("")
    const [currentId, setCurrentId] = useState("");
  const excludedFields = ["created_at", "job_id", "updated_at"];
  const [cookies] = useCookies(["Email", "AuthToken"]);
const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(6);
  // Retrieve email from cookies
  const userEmail = cookies.Email;

  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/jobsApi/jobs?page=${page}&pageSize=${pageSize}`
        );

        const jobsData = await response.json();
        setJobs(jobsData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [page, pageSize]);
console.log(searchLocation)
  useEffect(() => {
    const fetchFirstJob = async () => {
      try {
        const response = await fetch("http://localhost:8000/jobsApi/firstJob");
        const firstJobData = await response.json();
        setFirstJobRecord(firstJobData);

         //setFirstJobId(firstJobData.job_id);
         setCurrentId(firstJobData.job_id);
      } catch (err) {
        console.log(err);
      }
    };

    // Fetch only if firstJobRecord is empty
    if (Object.keys(firstJobRecord).length === 0) {
      fetchFirstJob();
    }
    //fetchFirstJob();
  }, [firstJobRecord]); // Run only when firstJobRecord changes

  /*const fetchData = async () => {
     try {
       const responseData = await fetch(
         `http://localhost:8000/jobsApi/searchJobs/${searchTitle}/${searchLocation}`
       );
       const jobsData = await responseData.json();
       // Do something with jobsData, setJobs(jobsData);
     } catch (err) {
       console.log(err);
     }
   };*/

/* const show = async (id) => {
   try {
     const response = await fetch(
       `http://localhost:8000/jobsApi/Detailjobs/${id}`
     );
     const responseData = await response.json();
     setFirstJobRecord(responseData.rows[0]);

     const statusResponse = await fetch(
       `http://localhost:8000/savedJobsApi/jobStatus/${id}`
     );
     const statusResponseValue = await statusResponse.json();

     const savedStatus = statusResponseValue.rows[0].saved_status;

     // Update status only if it's different from the current status
     if (status !== savedStatus) {
       setStatus(savedStatus);
     }

     setCurrentId(id);
   } catch (err) {
     console.error(err);
   }
 };

  const dispatch = useDispatch();
  
const searchBtn = async (e) => {
  e.preventDefault();

  let searchPath = "";

  if (searchTitle && searchLocation) {
    searchPath = `/SearchJobs/${encodeURIComponent(
      searchTitle
    )}/${encodeURIComponent(searchLocation)}`;
  } else if (searchTitle && !searchLocation) {
    searchPath = `/SearchJobs/${encodeURIComponent(searchTitle)}`;
  } else if (!searchTitle && searchLocation) {
    searchPath = `/SearchJobsLocation/${encodeURIComponent(searchLocation)}`;
  }

  if (searchPath) {
    nav(searchPath);
  }
};



  const saveBtn = async () => {
    //setStatus(!status);
    try {
      setStatus(true);
      const response = await fetch(
        "http://localhost:8000/savedJobsApi/savedJobs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            job_id: currentId,
          }),
        }
      );

      const responseStatus = await axios.put(
        `http://localhost:8000/jobsApi/jobs/${currentId}`,
        {
          saved_status: true,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const unSaveBtn = async () => {
    try {
      setStatus(false);
      const response = await axios.delete(
        `http://localhost:8000/savedJobsApi/savedJobs/${currentId}`
      );

      const responseStatus = await axios.put(
        `http://localhost:8000/jobsApi/jobs/${currentId}`,
        {
          saved_status: false,
        }
      );
      //setStatus(false);
    } catch (err) {
      console.log(err);
    }
  };
 const applyPage = (currentId) => {
   nav(`/Applyjob/${currentId}`);
   console.log(currentId);
 };


  const nextPage = async () => {
    setPage(page + 1);
  };

  const prevPage = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className={styles.main_div}>
      <div><button onClick={nextPage}>Next Page</button>
      <button onClick={prevPage}>Prev Page</button></div>
      <input
        type="text"
        id="searchTitle"
        name="searchTitle"
        placeholder="Enter Job Title "
        onChange={(e) => {
          setSearchTitle(e.target.value);
        }}
      />

      <input
        type="text"
        id="searchLocation"
        name="searchLocation"
        placeholder="Enter Location"
        onChange={(e) => {
          setSearchLocation(e.target.value);
        }}
      />

      <button onClick={searchBtn}>Search</button>

      <div className={styles.Job_div}>
        <div className={styles.jobs_div}>
          {jobs.map((job) => (
            <div
              className={styles.Grid_div}
              key={job.job_id}
              onClick={() => {
                show(job.job_id);
              }}
            >
              <p>Id: {job.job_id}</p>
              <p>Title: {job.title}</p>

              <p>Company Name: {job.company_name}</p>
            </div>
          ))}
        </div>

        <div className={styles.jobsDeatil_div}>
          {status === false ? (
            <>
              <button onClick={saveBtn}> Saved Btn</button>
            </>
          ) : (
            <>
              <button onClick={unSaveBtn}>Un save</button>
            </>
          )}

          {Object.entries(firstJobRecord).map(([key, value]) => {
            const uppercaseKey = key.toUpperCase().replace("_", " ");
            if (!excludedFields.includes(key)) {
              return <div key={key}>{`${uppercaseKey} : ${value} `}</div>;
            }
          })}
          <div>
            <button onClick={() => applyPage(currentId)}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};
*/
