import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { Navbar } from "../component/Navbar";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import icon2 from "../icons/icon2.png";



import {
  faCheck,
  faTimes,
  faInfoCircle,
  faTrash,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";
export const Register = () => {
  const [error, setError] = useState(null);
  /*const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");*/
  //const [cookies, setCookie, removeCookie] = useCookies(null);

  //*************** */
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const REGISTER_URL = "/register";

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [nextComp1, setNextComp1] = useState(true)

  const [showRole, setShowRole] = useState(false);
  const [role, setRole] = useState(null)


  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const Chip = ({ label, onDelete }) => {
    return (
      <div class="inline-block font-semibold py-2 pl-3 capitalize w-fit text-white px-2 rounded-full bg-blue-400"
      >
        <span >{label}</span>
        <button class="ml-2 text-gray-100 rounded-full  text-center font-bold" onClick={onDelete}><FontAwesomeIcon class="w-3  text-red-600 " icon={faXmark} /></button>
      </div>
    );
  };


  const handleAddSkill = () => {
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

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    /*console.log(result);
   console.log(user);*/
    setValidName(result);
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  console.log(username, email, pwd);

  const submitBtn = async (e) => {

    e.preventDefault();
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/usersApi/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password: pwd, role, skills }),
      });
      const data = await response.json();
      console.log(data);
      if (data.detail) {
        setError(data.detail);
      } else {
        /*setCookie("Email",data.email)
      setCookie('AuthToken', data.token)*/

        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    setNextComp1(false);
  }

  const nextBtn = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setShowRole(!showRole);

  };

  const setRoleUser = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setRole("user");
    console.log(role);
  };

  const setRoleEmployer = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setRole("employer");
    console.log(role);
  };
  console.log(showRole);
  const {
    company_name,
    employeer_name,
    employeer_email,
    employeer_Phone_no,
    title,
    location,
    no_of_employees,
    industry,
    type,
    sub_type,
  } = useSelector((state) => state.jobInfos);

  console.log(
    company_name,
    employeer_name,
    employeer_email,
    employeer_Phone_no,
    title,
    location,
    no_of_employees,
    industry,
    type,
    sub_type
  );
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <div class="flex min-h-full flex-col justify-center">
      <Navbar></Navbar>

      <div class="mt-14 mb-0 ">
        <img class="mx-auto h-16 w-auto" src={icon2} alt="Your Company" />

        <h2 class="mt-4 text-center text-2xl font-bold  tracking-tight text-gray-900">Sign up to get started</h2>
      </div>
      <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
        {errMsg}
      </p>
      {nextComp1 === true ? (
        <>
          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6">
              <div>
                <div>
                  <label className="block text-sm p-0 mb-[-18px] font-medium text-gray-900" htmlFor="role">Select Role</label> <br />
                  <div className="grid grid-cols-12 gap-2 mb-4">
                    <label className="rounded col-span-6 bg-blue-500 px-4 py-1 text-white focus-within:bg-blue-500">
                      <input
                        type="radio"
                        value="user"
                        checked={role === 'user'}
                        onChange={handleRoleChange}
                      />
                      &nbsp; User
                    </label>
                    <label className="rounded col-span-6 bg-blue-500 px-4 py-1 text-white focus-within:bg-blue-500">
                      <input
                        type="radio"
                        value="employer"
                        checked={role === 'employer'}
                        onChange={handleRoleChange}
                      />
                      &nbsp; Employer
                    </label>
                  </div>
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                  <div class="mt-2">
                    <input type="text"
                      id="username"
                      placeholder="Username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      autocomplete="email" class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>


                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validName
                      ? styles.instructions
                      : styles.offscreen
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    autocomplete="email" required class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? styles.valid : styles.hide}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? styles.hide : styles.invalid}
                  />
                </div>
                <div class="mt-2">
                  <input type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    placeholder="Password"
                    onBlur={() => setPwdFocus(false)}
                    autocomplete="current-password" class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd
                        ? styles.instructions
                        : styles.offscreen
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>
              </div>


              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900"> Confirm Password</label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={
                      validMatch && matchPwd ? styles.valid : styles.hide
                    }
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={
                      validMatch || !matchPwd ? styles.hide : styles.invalid
                    }
                  />
                </div>
                <div class="mt-2">
                  <input type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    placeholder="Confirm Password"
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    autocomplete="current-password" class="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch
                        ? styles.instructions
                        : styles.offscreen
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                  </p>
                </div>
              </div>

              <div>
                <button onClick={nextPage} class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Next</button>
              </div>


              <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                <a href="/Login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Log In</a>
              </p>

            </form>

          </div>
        </>
      ) : (
        ""
      )}
      {nextComp1 === false ? (
        <>
          <div class="flex justify-center mt-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Enter skill..."
                  className="border border-gray-300 px-3 py-2 rounded-md w-64 focus:outline-none focus:border-blue-500"
                />
                <button onClick={handleAddSkill} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Add Skill
                </button>
              </div>
              <div className="space-x-2">
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleDeleteSkill(skill)}
                  />
                ))}
              </div>
              <button onClick={submitBtn} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Submit
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};


/*import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Auth.module.css";
import { Navbar } from "../component/Navbar";
import { useCookies } from "react-cookie";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Register = () => {
  const [error, setError] = useState(null);
  /*const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");*/
//const [cookies, setCookie, removeCookie] = useCookies(null);

/*const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const userRef = useRef();
const errRef = useRef();

const [username, setUsername] = useState("");
const [validName, setValidName] = useState(false);
const [userFocus, setUserFocus] = useState(false);

const [email, setEmail] = useState("");

const [pwd, setPwd] = useState("");
const [validPwd, setValidPwd] = useState(false);
const [pwdFocus, setPwdFocus] = useState(false);

const [matchPwd, setMatchPwd] = useState("");
const [validMatch, setValidMatch] = useState(false);
const [matchFocus, setMatchFocus] = useState(false);

const [errMsg, setErrMsg] = useState("");
const [success, setSuccess] = useState(false);

const [showRole, setShowRole] = useState(false);
const[role, setRole]= useState("")
useEffect(() => {
  userRef.current.focus();
}, []);

useEffect(() => {
  const result = USER_REGEX.test(username);
  /*console.log(result);
 console.log(user);*/
/* setValidName(result);
}, [username]);

useEffect(() => {
 setValidPwd(PWD_REGEX.test(pwd));
 setValidMatch(pwd === matchPwd);
}, [pwd, matchPwd]);

useEffect(() => {
 setErrMsg("");
}, [username, pwd, matchPwd]);

console.log(username, email, pwd);

const submitBtn = async (e) => {
 e.preventDefault();
 const v1 = USER_REGEX.test(username);
 const v2 = PWD_REGEX.test(pwd);
 if (!v1 || !v2) {
   setErrMsg("Invalid Entry");
   return;
 }
 try {
   const response = await fetch("http://localhost:8000/usersApi/signup", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ username, email, password: pwd }),
   });
   const data = await response.json();
   console.log(data);
   if (data.detail) {
     setError(data.detail);
   } else {
     /*setCookie("Email",data.email)
   setCookie('AuthToken', data.token)*/

/*window.location.reload();
}
} catch (error) {
console.error(error);
}
};

const nextBtn = () => {
console.log("dddd")
setShowRole(!showRole);
console.log(showRole)
};
 
return (
<div className={styles.main_div}>
<Navbar></Navbar>

<p
ref={errRef}
className={errMsg ? styles.errmsg : styles.offscreen}
aria-live="assertive"
>
{errMsg}
</p>
<div className={styles.authcontainer}>
<form>
  {showRole === false ? (
    <>
      <h2 className={styles.main_heading}>Register</h2>
      <div className={styles.formGroup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />

        <p
          id="uidnote"
          className={
            userFocus && username && !validName
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">
          Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? styles.valid : styles.hide}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !pwd ? styles.hide : styles.invalid}
          />
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={
            pwdFocus && !validPwd
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a
          special character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <FontAwesomeIcon
            icon={faCheck}
            className={
              validMatch && matchPwd ? styles.valid : styles.hide
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              validMatch || !matchPwd ? styles.hide : styles.invalid
            }
          />
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={
            matchFocus && !validMatch
              ? styles.instructions
              : styles.offscreen
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>
      </div>

      <button className={styles.authBtn} onClick={nextBtn}>
        Next
      </button>
    </>
  ) : (
    <>
      <label htmlFor="role">Selcet Role</label>
      <button
        onClick={() => {
          setRole("user");
        }}
      >
        User
      </button>
      <button
        onClick={() => {
          setRole("employer");
        }}
      >
        Empolyer
      </button>
    </>
  )}
</form>
</div>
</div>
);
};*/



