import React, { useState, useEffect } from 'react'
import styles from "../styles/profile.module.css";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { Navbar } from "../component/Navbar";
export const User_Profile_Man = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [id, setId] = useState(null);

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const Chip = ({ label, onDelete }) => {
    return (
      <div className="chip">
        <span>{label}</span>
        <button onClick={onDelete}>x</button>
      </div>
    );
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");

    try {
      if (token) {
        const decodedToken = jwtDecode(token);

        const userId = decodedToken.user_id;
        setId(userId);
      }
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() !== "" && !skills.includes(skillInput)) {
      if (skills.length < 5) {
        setSkills([...skills, skillInput]);
        setSkillInput("");
      } else {
        alert("You can only add up to 5 skills.");
      }
    }
  };
  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills(updatedSkills);
  };

  const submitBtn = async (id) => {
    console.log("dddd")
    try {
      const response = await fetch(
        `http://localhost:8000/usersApi/update_profile/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password: pwd,
            skills,
          }),
        }
      );
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="main">
      <Navbar></Navbar>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                autoComplete="off"
                className="input"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="input"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
              />
            </div>
          </form>

          <div>
            <div className="mb-4 flex items-center">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Enter skill..."
                className="input flex-grow"
              />
              <button onClick={handleAddSkill} className="button ml-2">
                Add Skill
              </button>
            </div>
            <div className="mb-4">
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => handleDeleteSkill(skill)}
                />
              ))}
            </div>

            <button onClick={() => submitBtn(id)} className="button">
              Submit
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};