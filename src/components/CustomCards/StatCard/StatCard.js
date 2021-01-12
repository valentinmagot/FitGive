import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function StatCard(props) {
  const classes = useStyles();
  return (
    <div>
          <Card>
            <CardHeader color={props.cardHeader} stats icon>
              <CardIcon color={props.cardHeader}>
                <Icon>{props.cardIcon}</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>{props.cardTitle}</p>
              <h3 className={classes.cardTitle}>
                {props.cardStat}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>{props.cardLinkIcon}</Icon>
                <a style={{color:"#999"}} href="#pablo" onClick={e => e.preventDefault()}>
                  {props.cardLink}
                </a>
              </div>
            </CardFooter>
          </Card>
    </div>  
  );
}

