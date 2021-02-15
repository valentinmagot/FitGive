import React from "react";
import {useState,useEffect} from 'react';
//import {db} from "firebase"



//db
import {db} from "../../firebase"
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

import image from 'assets/img/faces/baller.jpg';
import {useAuth} from '../../context/authContext'


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
  const initial = currentUserInfo ? currentUserInfo.initial : ''
  const [open, setOpen] = useState(false);
  const [userWon, setUserWon] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setCurrentPatient("");
    // retrieveRequests();
  };


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
                if(data.winner == code){
                  setUserWon(true)
                }
                if(today > endDate.toDate()){
                  db.collection("CHALLENGES").doc(doc.id).collection('LOGS').where('user').get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        reps += doc.data()
                    })
                  })
                  db.collection("CHALLENGES").doc(doc.id).update({isComplete: true})
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
    isChallengeComplete()
  }, [])

  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
          <ProfileCard 
            userImage={image}
            userCode={code}
            userFirstName={firstname}
            userLastName={lastname}
            userBio='Energy and persistence conquers all.'
            buttonText='Edit Profile'
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
