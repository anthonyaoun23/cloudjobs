import React, { useEffect, useState } from "react";
import "./App.css";

import Jobs from "./Jobs";

const JOB_API_URL = "/api/jobs";

const mockJobs = [
  { title: "SWE 1", company: "Google" },
  { title: "SWE 2", company: "Apple" },
  { title: "SWE 2", company: "Microsoft" }
];

const fetchJobs = async updateCb => {
  const res = await fetch(JOB_API_URL);
  console.log(res);

  const json = await res.json();
  updateCb(json);
};

const App = () => {
  const [jobList, updateJobList] = useState([]);

  useEffect(() => {
    fetchJobs(updateJobList);
  }, []);

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
};

export default App;
