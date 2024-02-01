import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import user from "../icons/user.png";
import { useSelector } from "react-redux";
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import { useEffect } from "react";

import { useState } from "react";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const [checkToken, setCheckToken] = useState("");
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    setCheckToken(token || "");
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        const userEmail = decodedToken.email;
        const userRole = decodedToken.role;
        const userId = decodedToken.user_id
        setRole(userRole);
        setCurrentId(userId);
      }
    } catch (error) {
      if (error instanceof InvalidTokenError) {

        console.error("Invalid token");
      }
    }
  }, []);
  const logout = () => {
    window.sessionStorage.removeItem("token");
    setCheckToken("");

    nav("/");
  };
  const showMenu = () => {
    setShow(!show);
  };
  const listFunc = () => {
    nav("/profile");
  };
  const adminPageNav = () => {
    nav("/db_manage");
  };

  const candidatesPage = () => {
    nav("/Candidates");
  };
  const savedJobsPage = () => {
    nav("/SavedJobs");
  };
  const appliedJobsPage = () => {
    nav("/AplliedJobs");
  };

  return (
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>

              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

              <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <a href="/" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" ><Link to="/">Home</Link></a>
                <a href="/Job_Info" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"><Link to="/"><Link to="/">View Jobs</Link></Link></a>

                {role === "employer" ? <> <a href="/Job_Info" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"><Link to="/Job_Info">Post Job</Link></a> </> : ("")}


              </div>
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {checkToken === "" ? (
              <>

                <a href="/Register" class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"><Link to="/Register">Register </Link></a>

              </>
            ) : (
              <>


                <div class="relative ml-3">
                  <div>
                    <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" onClick={showMenu} id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                      <span class="absolute -inset-1.5"></span>
                      <span class="sr-only">Open user menu</span>
                      <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </button>
                  </div>

                  {show === true ? (
                    <div class="flex flex-col absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                      {role === "employer" ? (
                        <>
                          <p onClick={listFunc}>Profile</p>
                          <p onClick={candidatesPage}>Candidates</p>
                          <p onClick={logout}>Log Out</p>
                        </>
                      ) : (
                        ""
                      )}
                      {role === "user" ? (
                        <>
                          <a onClick={listFunc} role="menuitem" tabindex="-1" id="user-menu-item-0" href="#"class="text-gray-900">
                           Profile
                          </a>
                          <a onClick={savedJobsPage} role="menuitem" tabindex="-1" id="user-menu-item-1" href="#"class="text-gray-900">
                           Saved Jobs
                          </a>

                          <a onClick={appliedJobsPage} role="menuitem" tabindex="-1" id="user-menu-item-2" href="#" class="text-gray-900">
                            Applied Jobs
                          </a>
                          <a onClick={logout} role="menuitem" tabindex="-1" id="user-menu-item-3" href="#"class="text-gray-900">
                           Log Out
                          </a>

                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

              </>
            )}
          </div>

        </div>

      </div>

    </nav >
  );
};