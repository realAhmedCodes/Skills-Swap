const express = require("express")
const router = express.Router()
const pool = require("../db");



router.post("/savedJobs", async (req, res) => {
  const { email, job_id } = req.body;

  try {
    const applyJob = await pool.query(
      "INSERT INTO saved_jobs (  email, job_id) VALUES ($1, $2)",
      [email, job_id]
    );
    res
      .status(201)
      .json({ message: "Saved successfully", data: applyJob.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/savedJobs/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const applyJob = await pool.query(
      "SELECT j.* FROM saved_jobs sj JOIN jobs j ON sj.job_id = j.job_id WHERE sj.email = $1",
      [email]
    );

    res.json(applyJob.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/savedJobs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await pool.query(
      "DELETE FROM saved_jobs WHERE job_id = $1 RETURNING *",
      [id]
    );

    if (deletedJob.rows.length > 0) {
      res.status(200).json({
        message: "Job deleted successfully",
        data: deletedJob.rows[0],
      });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/jobStatus/:id", async (req, res) => {
  const { id } = req.params;
  try {
    
    const jobStatus = await pool.query(
      "SELECT saved_status FROM JOBS WHERE job_id =$1",
      [id]
    );
    res.json(jobStatus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;