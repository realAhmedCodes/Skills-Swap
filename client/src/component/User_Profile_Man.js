import React, { useState, useEffect } from 'react'
import styles from "../styles/profile.module.css";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
export const User_Profile_Man = () => {
    const [username, setUsername]= useState("")
     const [email, setEmail] = useState("");
      const [pwd, setPwd] = useState("");
      const [id, setId] = useState(null);
      
       const[skills, setSkills]= useState([])
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
    <div className={styles.main_div}>
      <form action="" className={styles.form}>
        <h2>Edit Profile</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
        </div>

     
      </form>

      <div>
        <div>
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Enter skill..."
          />
          <button onClick={handleAddSkill}>Add Skill</button>
        </div>
        <div>
          {skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
            />
          ))}
        </div>
       
        <button onClick={() => submitBtn(id)}>Submit</button>

      </div>
     
    </div>
  );
}
