const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/apply", async (req, res) => {
  const { name, email, phone_no, profile_link, doc, description, job_id } = req.body;

  try {
    const applyJob = await pool.query(
      "INSERT INTO job_application (name, email, phone_no, profile_link, doc, description, job_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, email, phone_no, profile_link, doc, description, job_id]
    );

    res.status(201).json({ message: "Applied successfully", data: applyJob.rows[0] });
  } catch (err) {
     console.error(err);
     res.status(500).json({ error: "Internal Server Error" });
  }
});





router.get("/apply", async (req, res) => {
  try {
    const applyJob = await pool.query(
      "SELECT * FROM job_application ORDER BY created_at DESC"
    );

    res.json(applyJob.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});

module.exports = router;