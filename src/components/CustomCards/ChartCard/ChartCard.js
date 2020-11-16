import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
    caloriesBunedChart
} from "variables/charts.js";

// react plugin for creating charts
import ChartistGraph from "react-chartist";


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function ChartCard(props) {
  const classes = useStyles();
  return (
    <div>
          <Card chart>
            <CardHeader color={props.cardHeader}>
              <ChartistGraph
                className="ct-chart"
                data={props.cardVariableData}
                type={props.cardChartType}
                options={props.cardVariableOptions}
                responsiveOptions={props.cardVariableResponsiveOptions}
                listener={props.cardVariableAnimation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>{props.cardTitle}</h4>
              <p className={classes.cardCategory}>{props.cardSubTitle}</p>
            </CardBody>
            <CardFooter chart>
              <div id='foot' className={classes.stats}>
                <Icon>{props.cardStatusIcon}</Icon>{props.cardStatus}
              </div>
            </CardFooter>
          </Card>
    </div>  
  );
}

ChartCard.defaultProps = {
      cardTitle: 'Title',
      cardHeader: 'success',
      cardSubTitle: 'Card Sub title',
      cardStatus: 'Status text',
      cardStatusIcon: 'access_time',
      cardChartType: 'Bar',
      cardVariableData: caloriesBunedChart.data,
      cardVariableOptions: caloriesBunedChart.option,
      cardVariableResponsiveOptions: caloriesBunedChart.responsiveOptions,
      cardVariableAnimation: caloriesBunedChart.animation,
}
