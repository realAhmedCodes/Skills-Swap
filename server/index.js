const PORT = process.env.PORT || 8000;

const express = require("express");

const cors = require("cors");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Routes imports
const jobsRouter = require("./Routes/jobs.js");
const userRouter = require("./Routes/users.js")
const applyRouter = require("./Routes/applyJob.js");
const savedRouter = require("./Routes/savedJobs.js");
const appliedRouter = require("./Routes/appliedJobs.js");
app.use(cors())
app.use(express.json())
app.use("/jobsApi", jobsRouter);
app.use("/usersApi", userRouter);
app.use("/applyApi", applyRouter);
app.use("/savedJobsApi", savedRouter)
app.use("/appliedApi", appliedRouter)
app.get("/", (req, res) => {
  res.send("Welcome to the root path!");
});
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});