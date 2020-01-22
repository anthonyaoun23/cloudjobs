import React from "react";
import { Typography } from "@material-ui/core";

export default function Job({ job }) {
  return (
    <div className="job">
      <p>{job.title}</p>
      <p>{job.company}</p>
    </div>
  );
}
