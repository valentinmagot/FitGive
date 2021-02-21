import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

// core components
import Button from "components/CustomButtons/Button.js";
import Divider from '@material-ui/core/Divider';
import CompleteChallenge from "views/CompleteChallenge/CompleteChallenge"
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function ChallengeCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setCurrentPatient("");
    // retrieveRequests();
  };

  return (
    <div>
      <h6 className={classes.cardCategory}>{props.daysLeft}</h6>
      <h4 className={classes.cardTitle}>{props.challengeName}</h4>
      <Divider />
      <p className={classes.description}>{props.challengeDescription}</p>
      <Button color="primary"
        onClick={handleClickOpen}>
        {props.buttonText}
      </Button>
      <CompleteChallenge open={open} onClose={handleClose}></CompleteChallenge>
    </div>
  );
}

