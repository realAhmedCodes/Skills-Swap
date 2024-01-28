
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Auth} from "./pages/Auth"
import { Job_Module } from './pages/Job_Module';

import { Job_Info } from './component/Job_Info';
import { Job_Desc } from "./component/Job_Desc";
import { Job_Pay } from "./component/Job_Pay";
import { Job_docs } from "./component/Job_docs";
import { Register } from './component/Register';
import { Login } from './component/Login';
import { Navbar } from './component/Navbar';
import { ViewJobs } from './pages/ViewJobs';
import { Home } from './pages/Home';
import { SearchShow } from './pages/SearchShow';
import { JobDetail } from './pages/JobDetail';
import { ApplyJob } from './pages/ApplyJob';
import { ShowSavedJobs } from './pages/ShowSavedJobs';
import { ShowAppliedJobs } from './pages/ShowAppliedJobs';
import { Candidates } from './pages/Candidates';
import { User_Profile_Man } from './component/User_Profile_Man';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ViewJobs></ViewJobs>}></Route>
          <Route path="/Job_Info" element={<Job_Info></Job_Info>}></Route>
          <Route path="/Job_Desc" element={<Job_Desc></Job_Desc>}></Route>
          <Route path="/Job_Pay" element={<Job_Pay></Job_Pay>}></Route>
          <Route path="/Job_docs" element={<Job_docs></Job_docs>}></Route>
          <Route path="/Register" element={<Register></Register>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
          <Route path="/Navbar" element={<Navbar></Navbar>}></Route>

          <Route
            path="/SearchJobs/:searchTitle/:searchLocation"
            element={<SearchShow />}
          />

          <Route path="/SearchJobs/:searchTitle" element={<SearchShow />} />

          <Route
            path="/SearchJobsLocation/:searchLocation"
            element={<SearchShow />}
          />

          <Route
            path="/DetailJob/:job_id"
            element={<JobDetail></JobDetail>}
          ></Route>

          <Route path="/ApplyJob/:currentId" element={<ApplyJob />} />
          <Route
            path="/AplliedJobs"
            element={<ShowAppliedJobs></ShowAppliedJobs>}
          ></Route>
          <Route
            path="/SavedJobs"
            element={<ShowSavedJobs></ShowSavedJobs>}
          ></Route>
          <Route path="/Candidates" element={<Candidates></Candidates>}></Route>
          <Route path="/profile" element={<User_Profile_Man></User_Profile_Man>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
