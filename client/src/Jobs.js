import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Job from "./Job";

export default function Jobs({ jobs }) {
  const numJobs = jobs.length;
  const numPages = Math.ceil(numJobs / 50);

  const [activeStep, setActiveStep] = useState(0);

  const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50);

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
      <Typography variant="h4" component="h1">
        Cloud Related Jobs
      </Typography>
      <Typography variant="h6" component="h2">
        Found {numJobs} Jobs
      </Typography>
      {jobsOnPage.map(job => (
        <Job job={job} />
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
