import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Job from "./Job";
import JobModal from "./JobModal";

export default function Jobs({ jobs }) {
  // Modal
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({});

  // Pagination
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);
  const [activeStep, setActiveStep] = useState(0);
  const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className="jobs">
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <Typography variant="h4" component="h1">
        Cloud Related Jobs
      </Typography>
      <Typography variant="h6" component="h2">
        Found {numJobs} Jobs
      </Typography>
      {jobsOnPage.map((job, i) => (
        <Job
          key={i}
          job={job}
          onClick={() => {
            handleClickOpen();
            setSelectedJob(job);
          }}
        />
      ))}
      <div>
        Page {activeStep + 1} of {numPages}
      </div>
      <MobileStepper
        variant="progress"
        steps={numPages}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
