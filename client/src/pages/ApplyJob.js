import React, { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
export const ApplyJob = () => {
  const { currentId } = useParams();
    const [name, setName]= useState("")
    const [email, setEmail] = useState("");
    const [phone_no, setPhone_No] = useState("");
    const [profile_link, setProfile_Link] = useState("");
    const [doc, setDoc] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError]= useState("")
    const [jobId, setJobId] = useState(null)
 
       
       



       useEffect(() => {
         const token = window.sessionStorage.getItem("token");
        setJobId(currentId)
         try {
           if (token) {
             const decodedToken = jwtDecode(token);
             const userEmail = decodedToken.email;
            
             setEmail(userEmail);
           }
         } catch (error) {
           if (error instanceof InvalidTokenError) {
             console.error("Invalid token");
           }
         }
       }, []);

      

    const handleFileChange = (event) => {
    setDoc(event.target.files[0]); }

    const submitBtn = async (e) => {
      e.preventDefault();
      try {
        // First POST request to apply for the job
        const applyResponse = await fetch(
          "http://localhost:8000/applyApi/apply",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phone_no,
              profile_link,
              doc,
              description,
              job_id: jobId,
            }),
          }
        );

        const applyData = await applyResponse.json();

        if (applyData.detail) {
          setError(applyData.detail);
        } else {
          // Second POST request to add applied job to a list
          const addAppliedJobResponse = await fetch(
            "http://localhost:8000/appliedApi/appliedJobs",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                job_id: jobId,
              }),
            }
          );

          const addAppliedJobData = await addAppliedJobResponse.json();

          if (addAppliedJobData.message === "Saved successfully") {
            // Handle success scenario after both POST requests
            window.location.reload();
          } else {
            setError("Error adding applied job");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    
  return (
    <div>
      <form action="" onSubmit={submitBtn}>
        <label htmlFor="name">Name and surname</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Full Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

       

        <label htmlFor="phone_no">Phone number</label>
        <input
          type="text"
          id="phone_no"
          name="phone_no"
          placeholder="Enter Phone Number"
          onChange={(e) => {
            setPhone_No(e.target.value);
          }}
        />

        <label htmlFor="profile_link">Linkedin Profile</label>
        <input
          type="text"
          id="profile_link"
          name="profile_link"
          placeholder="Paste Link"
          onChange={(e) => {
            setProfile_Link(e.target.value);
          }}
        />

        <label htmlFor="doc">Attachments(Cv/Reusme)</label>
        <input
          type="file"
          id="doc"
          name="doc"
          placeholder="Drop File"
          onChange={handleFileChange}
        />

        <label htmlFor="desc">Why are you perfect fit for this role</label>
        <textarea
          name="postContent"
          rows={15}
          cols={80}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}
