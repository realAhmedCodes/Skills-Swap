const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { username, email, password, role, skills } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await pool.query(
      "INSERT INTO USERS(username, email, password, role, skills) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, role, skills]
    );
    res.status(201).json({
      message: "User created successfully",
      data: newUser.rows[0], // Sending the inserted user data in the response
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM USERS WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length) {
      return res.status(401).json({ detail: "User does not exist!" });
    }

    const match = await bcrypt.compare(password, users.rows[0].password);

    if (match) {
      const user = users.rows[0];
      const tokenPayload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(
        tokenPayload,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
          expiresIn: "1hr",
        }
      );

      // Check role and perform authorization logic here
      if (user.role === "user") {
        // Example: Allow access to user-specific data
        res.json({ email: user.email, token, access: "user-specific-data" });
      } else if (user.role === "employer") {
        // Example: Allow access to employer-specific data
        res.json({
          email: user.email,
          token,
          access: "employer-specific-data",
        });
      } else {
        // If the role doesn't match any expected roles, deny access
        res.status(403).json({ detail: "Forbidden" });
      }
    } else {
      res.status(401).json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM USERS");
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: err.detail || "Internal Server Error" });
  }
});



router.put("/update_profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, skills } = req.body;

  const salt = bcrypt.genSaltSync(10); // Define the salt variable
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const updatedUser = await pool.query(
      "UPDATE USERS SET username = $1, email = $2, password = $3, skills = $4 WHERE user_id = $5 RETURNING *",
      [username, email, hashedPassword, skills, userId]
    );

    res.status(200).json({
      message: "User profile updated successfully",
      data: updatedUser.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;


/*
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM USERS WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length) {
      // Corrected check for existing user
      return res.status(401).json({ detail: "User does not exist!" });
    }

    const match = await bcrypt.compare(
      password,
      users.rows[0].password 
    );

    if (match) {
      const token = jwt.sign({ email }, `${process.env.ACCESS_TOKEN_SECRET}`, {
        expiresIn: "1hr",
      });
      res.json({ email: users.rows[0].email, token });
    } else {
      res.status(401).json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});
*/

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM USERS WHERE email = $1", [
      email,
    ]);
    if (!users.rows.length) {
      return res.status(401).json({ detail: "User does not exist!" });
    }

    const match = await bcrypt.compare(password, users.rows[0].password);

    if (match) {
      const user = users.rows[0];
      const tokenPayload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role, 
      };

      const token = jwt.sign(
        tokenPayload,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        {
          expiresIn: "1hr",
        }
      );

      // Check role and perform authorization logic here
      if (user.role === "user") {
        // Example: Allow access to user-specific data
        res.json({ email: user.email, token, access: "user-specific-data" });
      } else if (user.role === "employer") {
        // Example: Allow access to employer-specific data
        res.json({
          email: user.email,
          token,
          access: "employer-specific-data",
        });
      } else {
        // If the role doesn't match any expected roles, deny access
        res.status(403).json({ detail: "Forbidden" });
      }
    } else {
      res.status(401).json({ detail: "Login failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM USERS");
    res.json(users.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: err.detail || "Internal Server Error" });
  }
});

module.exports = router;
