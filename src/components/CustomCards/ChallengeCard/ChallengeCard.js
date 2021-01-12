import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import Divider from '@material-ui/core/Divider';



import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function ChallengeCard(props) {
  const classes = useStyles();
  return (
    <div>
          <h6 className={classes.cardCategory}>{props.daysLeft}</h6>
          <h4 className={classes.cardTitle}>{props.challengeName}</h4>
          <Divider />
          <p className={classes.description}>{props.challengeDescription}</p>
          <Button color="primary" >
            {props.buttonText}
          </Button>
    </div>
  );
}

