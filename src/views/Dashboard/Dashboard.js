import React from "react";
//import {db} from "firebase"


import {auth, db} from "firebase"
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";



// custom components
import StatCard from "components/CustomCards/StatCard/StatCard"
//import useAuth from "context/authContext.js"
import ChartCard from "components/CustomCards/ChartCard/ChartCard"
import ProfileCard from "components/CustomCards/ProfileCard/ProfileCard"
import { useAuth } from "context/authContext.js"

import {
  caloriesBunedChart,
  workoutTimeChart,
  moneyGeneratedChart,
  communityGrowthChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const {currentUserInfo} = useAuth()
  const code = currentUserInfo ? currentUserInfo.code : ''
  const firstname = currentUserInfo ? currentUserInfo.firstname.toUpperCase() : ''
  const lastname = currentUserInfo ? currentUserInfo.lastname.toUpperCase() : ''
  const firstname_0 = firstname ? firstname.charAt(0).toUpperCase(): ''
  const lastname_0 = lastname ? lastname.charAt(0).toUpperCase() : ''
  const initial = firstname_0 && lastname_0 ? firstname_0 + lastname_0 : ''
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <ProfileCard 
            userCode={code}
            userFirstName={firstname}
            userLastName={lastname}
            initial={initial}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <StatCard 
            cardTitle= 'Challenges Won'
            cardStat= '2'
            cardLink= 'see details'
            cardIcon= 'emoji_events'
            cardHeader= 'warning'
            cardLinkIcon='link'
          />
          
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
           <StatCard 
                 cardTitle= 'Challenges Lost'
                 cardStat= '0'
                 cardLink= 'see details'
                 cardIcon= 'cancel'
                 cardHeader= 'danger'
                 cardLinkIcon='link'
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <StatCard 
                cardTitle= 'Money Pledged'
                cardStat= '20$'
                cardLink= 'just updated'
                cardIcon= 'local_atm'
                cardHeader= 'success'
                cardLinkIcon='access_time'
            />
          
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
           <StatCard 
             cardTitle= 'Friends'
             cardStat= '3'
             cardLink= 'just updated'
             cardIcon= 'accessibility'
             cardHeader= 'info'
             cardLinkIcon='access_time'
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
        <ChartCard 
            cardTitle='Calories Burned'
            cardHeader='primary'
            cardSubTitle='Total calories burned during exercises'
            cardStatus='Updated 1 minute ago'
            cardStatusIcon='access_time'
            cardChartType='Bar'
            cardVariableData={caloriesBunedChart.data}
            cardVariableOptions={caloriesBunedChart.option}
            cardVariableResponsiveOptions={caloriesBunedChart.responsiveOptions}
            cardVariableAnimation={caloriesBunedChart.animation}
        
          />
          
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <ChartCard 
            cardTitle='Money Donated'
            cardHeader='primary'
            cardSubTitle='Amount of money donated to charities.'
            cardStatus='updated 12 days ago'
            cardStatusIcon='access_time'
            cardChartType='Line'
            cardVariableData={moneyGeneratedChart.data}
            cardVariableOptions={moneyGeneratedChart.option}
            cardVariableResponsiveOptions={moneyGeneratedChart.responsiveOptions}
            cardVariableAnimation={moneyGeneratedChart.animation}
        
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <ChartCard 
                cardTitle='Workout time'
                cardHeader='primary'
                cardSubTitle='Total workout minutes of the week'
                cardStatus='Updated 1 minute ago'
                cardStatusIcon='access_time'
                cardChartType='Bar'
                cardVariableData={workoutTimeChart.data}
                cardVariableOptions={workoutTimeChart.option}
                cardVariableResponsiveOptions={workoutTimeChart.responsiveOptions}
                cardVariableAnimation={workoutTimeChart.animation}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <ChartCard 
            cardTitle='Comunity growth'
            cardHeader='primary'
            cardSubTitle='Commutnity growth over the year'
            cardStatus='updated 2 days ago'
            cardStatusIcon='access_time'
            cardChartType='Line'
            cardVariableData={communityGrowthChart.data}
            cardVariableOptions={communityGrowthChart.option}
            cardVariableResponsiveOptions={communityGrowthChart.responsiveOptions}
            cardVariableAnimation={communityGrowthChart.animation}
        />
        </GridItem>
      </GridContainer>
    </div>
  );
}
