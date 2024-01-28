<div className={styles.navbar}>
  <div className={styles.links}>
    <Link to="/">View Jobs</Link>
    {role === "employer" ? <> <Link to="/Job_Info">Post Job</Link></> : ("")}

    {checkToken === "" ? (
      <>

        <Link to="/Register">Register </Link>
      </>
    ) : (
      <>
        <div>
          <div className={styles.login_btn}>
            <div className={styles.profile}>
              <img
                className={styles.profile_img}
                src={user}
                alt="user image"
                onClick={showMenu}
              />
            </div>
            {show === true ? (
              <div className={styles.menu}>
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
                    <p onClick={listFunc}>Profile</p>
                    <p onClick={savedJobsPage}>Saved Jobs</p>
                    <p onClick={appliedJobsPage}>Applied Jobs</p>
                    <p onClick={logout}>Log Out</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    )}
  </div>
</div>