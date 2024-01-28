const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/jobs", async (req, res) => {
  const {
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
    created_at,
    updated_at,

    deadline,
    email,
    industry,
    type,
    sub_type,
    web_link,
  } = req.body;
  try {
    const newJob = await pool.query(
      "INSERT INTO jobs (company_name, no_of_employees, employeer_name, employeer_email,company_email, employeer_Phone_no, title, location, description, rate, salary, job_type,work_Nature , deadline, email,industry,type,sub_type,web_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,$16, $17, $18,$19)",
      [
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
      ]
    );

    res
      .status(201)
      .json({ message: "Job created successfully", data: newJob.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const offset = (page - 1) * pageSize;
    console.log(page, pageSize)

    const jobs = await pool.query(
      "SELECT * FROM JOBS ORDER BY created_at DESC LIMIT $1  OFFSET $2",
      [pageSize, offset]
    );

    res.json(jobs.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.put("/jobs/:id", async (req, res) => {
  const { id } = req.params;
  const { saved_status } = req.body;
  console.log(saved_status, id)

  try {
    const updatedJob = await pool.query(
      "UPDATE jobs SET saved_status = $1 WHERE job_id = $2 RETURNING *",
      [saved_status, id]
    );

    // ... (response handling)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});






module.exports = router;



router.get("/Detailjobs/:id", async(req, res)=>{
  const {id}= req.params
  try {
    const jobData = await pool.query("SELECT * FROM JOBS WHERE job_id =$1", [
      id,
    ]);
    res.json(jobData);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Internal Server Error" }); 
  }

})
router.get("/firstJob", async (req, res) => {
  try {
   

    const latestJob = await pool.query(
      "SELECT * FROM JOBS ORDER BY created_at DESC LIMIT 1"
    );
    const latestJobData = latestJob.rows[0];
    res.json(latestJobData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

router.get("/SearchJobs/:searchTitle/:searchLocation", async (req, res) => {
  try {
    const { searchTitle, searchLocation } = req.params;

    // Split the searchTitle into individual words
    const searchWords = searchTitle.split(" ");

    // Create an array to hold the placeholders for each word
    const queryParams = [];
    let queryConditions = "";

    // Create query conditions for each word
    searchWords.forEach((word, index) => {
      queryParams.push(`%${word}%`);
      queryConditions += ` (title ILIKE $${index + 1} OR industry ILIKE $${
        index + 1
      } OR type ILIKE $${index + 1})`;

      if (index !== searchWords.length - 1) {
        queryConditions += " AND";
      }
    });

    
    const searchQuery = `
      SELECT * FROM JOBS 
      WHERE (${queryConditions}) AND location ILIKE $${searchWords.length + 1}
      ORDER BY created_at DESC
      LIMIT 6
    `;
    queryParams.push(`%${searchLocation}%`);

    const jobs = await pool.query(searchQuery, queryParams);
    res.json(jobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});








router.get("/SearchJobs/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const searchQuery = `
      SELECT * FROM JOBS 
      WHERE title ILIKE $1 OR industry ILIKE $1 OR type  ILIKE $1
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    const jobs = await pool.query(searchQuery, [`%${title}%`]);
    res.json(jobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/SearchJobsLocation/:location", async (req, res) => {
  try {
    const { location } = req.params;
    // console.log(location);
    const searchQuery = `
      SELECT * FROM JOBS 
      WHERE location ILIKE $1 
      ORDER BY created_at DESC 
      LIMIT 6
    `;
    const jobs = await pool.query(searchQuery, [`%${location}%`]);
    res.json(jobs.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;


 /*const latesJob = await pool.query(
   "SELECT job_id FROM JOBS ORDER BY created_at DESC LIMIT 1"
 );
 const latestJobId = latesJob.rows[0].job_id;*/


 /*router.get("/jobs", async (req, res) => {
  try {
    const jobs = await pool.query("SELECT * FROM JOBS ORDER BY created_at DESC");

    const latesJob= await pool.query("SELECT job_id FROM JOBS ORDER BY created_at DESC LIMIT 1")
     const latestJobId= latesJob.rows[0].job_id
    res.json(jobs.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" }); // Send an error response
  }
});*/