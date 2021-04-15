import React from "react";
import { useState, useEffect } from 'react';
//import {db} from "firebase"



//db
import { db } from "../../firebase"
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";


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
  const { currentUserInfo, currentUser } = useAuth()
  const code = currentUserInfo ? currentUserInfo.code : ''
  const firstname = currentUserInfo ? currentUserInfo.firstname.toUpperCase() : ''
  const lastname = currentUserInfo ? currentUserInfo.lastname.toUpperCase() : ''
  const initial = currentUserInfo ? currentUserInfo.initial : ''
  const uid = currentUser ? currentUser.uid : ''

  const [open, setOpen] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [countFriends, setCountFriends] = useState(0);
  const [countWon, setCountWon] = useState(0);
  const [countLost, setCountLost] = useState(0);
  const [countMoney, setCountMoney] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getStats = () => {
    if (currentUser) {
      db.collection("USERS").doc(uid).collection('FRIENDS').get().then(snap => {
        setCountFriends(snap.size);
      })
      db.collection("USERS").doc(uid)
        .get()
        .then(function (doc) {
          if (doc.data().statMoney) {
            setCountLost(doc.data().statLost)
            setCountWon(doc.data().statWon)
            setCountMoney(doc.data().statMoney)
          }
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }

  const isChallengeComplete = () => {
    let query = db.collection("CHALLENGES")
    let reps = 0
    query = query.where("isComplete", "==", false)
    query.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          const endDate = data.endDate
          const today = new Date()
          // console.log(today.getDate())
          // console.log(endDate.toDate())
          // console.log(doc.id)
          if (data.winner == code) {
            setUserWon(true)
          }
          if (today > endDate.toDate()) {
            db.collection("CHALLENGES").doc(doc.id).collection('LOGS').where('user').get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  reps += doc.data()
                })
              })
            db.collection("CHALLENGES").doc(doc.id).update({ isComplete: true })
              .then(() => {
                handleClickOpen()
              })
              .catch((err) => {
                console.log(err)
              })
          }

        });

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  useEffect(() => {
    isChallengeComplete();
    getStats();
  }, [])

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
            cardTitle='Challenges Won'
            cardStat={countWon}
            cardLink='see details'
            cardIcon='emoji_events'
            cardHeader='warning'
            cardLinkIcon='link'
          />

        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <StatCard
            cardTitle='Challenges Lost'
            cardStat={countLost}
            cardLink='see details'
            cardIcon='cancel'
            cardHeader='danger'
            cardLinkIcon='link'
          />
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <StatCard
            cardTitle='Money Pledged'
            cardStat={countMoney + '$'}
            cardLink='just updated'
            cardIcon='local_atm'
            cardHeader='success'
            cardLinkIcon='access_time'
          />

        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <StatCard
            cardTitle='Friends'
            cardStat={countFriends <= 0 ? 0 : countFriends - 1}
            cardLink='just updated'
            cardIcon='accessibility'
            cardHeader='info'
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
            cardStatus='Updated Just Now'
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
            cardStatus='Updated Just Now'
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
            cardStatus='Updated Just Now'
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
            cardStatus='Updated Just Now'
            cardStatusIcon='access_time'
            cardChartType='Line'
            cardVariableData={communityGrowthChart.data}
            cardVariableOptions={communityGrowthChart.option}
            cardVariableResponsiveOptions={communityGrowthChart.responsiveOptions}
            cardVariableAnimation={communityGrowthChart.animation}
          />
        </GridItem>
      </GridContainer>
      {open &&
        <Dialog open={open} onClose={handleClose} disableBackdropClick={true}>
          <DialogTitle id="simple-dialog-title">End of challenge</DialogTitle>
          <DialogContent>
            {userWon ? <p>Congratualation you are the winner of the challenge</p> : <p>Unfortunately you lost this callenge, great effort !</p>}
            <Button color="danger" onClick={handleClose}>Close</Button>
          </DialogContent>
        </Dialog>
      }
    </div>
  );
}
