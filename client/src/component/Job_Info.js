import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Job_Desc } from "../component/Job_Desc";
import { useDispatch, useSelector } from "react-redux";
import { addJobInfo } from "../slices/Job_Info";

export const Job_Info = () => {
  const [company_name, setCompany_Name] = useState("");
  const [employeer_name, setEmployeer_Name] = useState("");
  const [employeer_email, setEmployeer_email] = useState("");
  const [employeer_Phone_no, setEmployeer_Phone_no] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [no_of_employees, setNo_of_employees] = useState("");
  const [industry, setIndustry] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  const nav = useNavigate();
  const dispatch = useDispatch();
  const navPage = (e) => {
    e.preventDefault();
    const jobInfos = {
      company_name,
      employeer_name,
      employeer_email,
      employeer_Phone_no,
      title,
      location,
      no_of_employees,
      industry,
      type,
     sub_type: subType
    };
    dispatch(addJobInfo(jobInfos));
    nav("/Job_Desc");
  };
const { userRole } = useSelector((state) => state.userValues);
console.log("ROle", userRole);
  useEffect(() => {
    console.log(company_name);
  }, [company_name]);

   //console.log(industry,type, subType);
  return (
    <div className="main_div">
      <form action="">
        <input
          type="text"
          id="company_name"
          name="company_name"
          placeholder="company name"
          onChange={(e) => {
            setCompany_Name(e.target.value);
          }}
        />
        <input
          type="text"
          id="employeer_name"
          name="employeer_name"
          placeholder="Name"
          onChange={(e) => {
            setEmployeer_Name(e.target.value);
          }}
        />
        <input
          type="email"
          id="employer_email"
          name="employeer_email"
          placeholder="Email"
          onChange={(e) => {
            setEmployeer_email(e.target.value);
          }}
        />
        <input
          type="text"
          id="employer_Phone_no"
          name="employeer_Phone_no"
          placeholder="phone no"
          onChange={(e) => {
            setEmployeer_Phone_no(e.target.value);
          }}
        />
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Ex: Web Developer"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Ex: Lahore"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          type="text"
          id="no_employee"
          name="no_employee"
          placeholder="no of employee"
          onChange={(e) => {
            setNo_of_employees(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setIndustry(e.target.value);
          }}
        >
          <option value="">Select Industry</option>
          <option value="it"> Information Technology (IT)</option>
          <option value="engineering"> Engineering</option>
          <option value="healthcare"> Healthcare</option>
          <option value="finance">Finance</option>

          <option value="media and entertainment">
            Media and Entertainment
          </option>
          <option value="retail">Retail</option>
          <option value="other">Other</option>
        </select>
        {industry === "it" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Network Engineering"> Network Engineering</option>
              <option value="Cybersecurity"> Cybersecurity</option>
              <option value="Database">Database</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Software Engineering" && industry === "it" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Application Development">
                Application Development
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Quality Assurance/Testing">
                Quality Assurance/Testing
              </option>
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Network Engineering" && industry === "it" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Network Administrator">
                Network Administrator
              </option>
              <option value="Network Architect">Network Architect</option>
              <option value="Systems Engineer">Systems Engineer</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Cybersecurity" && industry === "it" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Information Security Analyst">
                Information Security Analyst
              </option>
              <option value="Ethical Hacker">
                Ethical Hacker/Penetration Tester
              </option>
              <option value="Security Engineer">Security Engineer</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Database" && industry === "it" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Database Administrator ">
                Database Administrator
              </option>
              <option value="Ethical Hacker">
                Ethical Hacker/Penetration Tester
              </option>
              <option value="Security Engineer">Security Engineer</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}

        {industry === "engineering" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Civil Engineering"> Civil Engineering</option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Mechanical Engineering" && industry === "engineering" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Automotive Engineer">Automotive Engineer</option>
              <option value="Aerospace Engineer">Aerospace Engineer</option>
              <option value="Manufacturing Engineer">
                Manufacturing Engineer
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Civil Engineering" && industry === "engineering" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Structural Engineer">Structural Engineer</option>
              <option value="Environmental Engineer">
                Environmental Engineer
              </option>
              <option value="Geotechnical Engineer">
                Geotechnical Engineer
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Electrical Engineering" && industry === "engineering" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Power Systems Engineer">
                Power Systems Engineer
              </option>
              <option value="Control Systems Engineer">
                Control Systems Engineer
              </option>
              <option value="Electronics Engineer">Electronics Engineer</option>
              <option value="Telecommunications Engineer">
                Telecommunications Engineer
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Chemical Engineering" && industry === "engineering" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Clinical Engineer">Clinical Engineer</option>
              <option value="Rehabilitation Engineer">
                Rehabilitation Engineer
              </option>
              <option value="Biomaterials Engineer">
                Biomaterials Engineer
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {industry === "healthcare" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Medicine">Medicine</option>
              <option value="Allied Health">Allied Health</option>
              <option value="Healthcare Administration">
                Healthcare Administration
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Medicine" && industry === "healthcare" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Physician">Physician</option>
              <option value="Surgeon">Surgeon</option>
              <option value="Nurse">Nurse</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Allied Health" && industry === "healthcare" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Physical Therapist">Physical Therapist</option>
              <option value="Occupational Therapist">
                Occupational Therapist
              </option>
              <option value="Radiologic Technologist">
                Radiologic Technologist
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Healthcare Administration" && industry === "healthcare" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Hospital Administrator">
                Hospital Administrator
              </option>
              <option value="Health Information Manager">
                Health Information Manager
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {industry === "finance" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Banking">Banking</option>
              <option value="Accounting">Accounting</option>
              <option value="Financial Technology">Financial Technology</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Banking" && industry === "finance" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Bank Teller">Bank Teller</option>
              <option value="Financial Analyst">Financial Analyst</option>
              <option value="Investment Banker">Investment Banker</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Accounting" && industry === "finance" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Accountant">Accountant</option>
              <option value="Auditor">Auditor</option>
              <option value="Tax Consultant">Tax Consultant</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Financial Technology" && industry === "finance" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Financial Software Developer">
                Financial Software Developer
              </option>
              <option value="Data Analyst in Finance">
                Data Analyst in Finance
              </option>
              <option value="Risk Management">Risk Management</option>

              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {industry === "media and entertainment" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Film and Television">Film and Television</option>
              <option value="Journalism">Journalism</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Film and Television" &&
        industry === "media and entertainment" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Director">Director</option>
              <option value="Film Editor">Film Editor</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Journalism" && industry === "media and entertainment" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Journalist">Journalist</option>
              <option value="News Anchor">News Anchor</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {industry === "retail" ? (
          <>
            <select
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">Select Job Type</option>
              <option value="Sales">Sales</option>
              <option value="Merchandising">Merchandising</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Sales" && industry === "retail" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Retail Sales Associate">
                Retail Sales Associate
              </option>
              <option value="Sales Manager">Sales Manager</option>
              <option value="Customer Service Representative">
                Customer Service Representative
              </option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        {type === "Merchandising" && industry === "retail" ? (
          <>
            <select
              onChange={(e) => {
                setSubType(e.target.value);
              }}
            >
              <option value="">Select Job</option>
              <option value="Inventory Manager">Inventory Manager</option>
              <option value="Visual Merchandiser">Visual Merchandiser</option>
              <option value="other">Other</option>
            </select>
          </>
        ) : (
          ""
        )}
        <button onClick={navPage}>Next</button>
      </form>
    </div>
  );
};

