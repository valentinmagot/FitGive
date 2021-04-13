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
  const initial = currentUserInfo ? currentUserInfo.initial : ''
  const [open, setOpen] = useState(false);
  const [userWon, setUserWon] = useState(false);

  const [userReps, setUserReps] = useState();
  const [friendReps, setFriendReps] = useState();
  const [winner, setWinner] = useState();
  const [loser, setLoser] = useState();
  const [winnerReps, setWinnerReps] = useState();
  const [loserReps, setLoserReps] = useState();
  const [amount, setAmount] = useState();
  const [challengeName, setChallengeName] = useState();

  const handleClickOpen = () => {
    console.log(winnerReps)
    console.log(loserReps)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setCurrentPatient("");
    // retrieveRequests();
  };


  const isChallengeComplete = () => {
    let query = db.collection("CHALLENGES")
    let user_reps = 0
    let friend_reps = 0
    query = query.where("isComplete", "==", false)
        query.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const endDate = data.endDate
                const participant = doc.data().participants
                setAmount(doc.data().moneyAmount)
                setChallengeName(doc.data().challengeName)
                const today = new Date()
                let user_win;
                // console.log(today.getDate())
                // console.log(endDate.toDate())
                // console.log(doc.id)

                if(today > endDate.toDate()){
                  db.collection("CHALLENGES").doc(doc.id).collection('LOGS').get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach((docu) => {
                        if(docu.data().user == code){
                          user_reps += docu.data().repetitions
                          setUserReps(user_reps)
                        }else {
                          friend_reps += docu.data().repetitions
                          setFriendReps(friendReps)
                        }


                          if(user_reps > friend_reps){
                            user_win = participant[0]
                            setWinner(participant[0])
                            setWinnerReps(user_reps)
                            setLoser(participant[1])
                            setLoserReps(friend_reps)
                            setUserWon(true)
                        }else {
                            user_win = participant[1]
                            setWinner(participant[1])
                            setWinnerReps(friend_reps)
                            setLoser(participant[0])
                            setLoserReps(user_reps)
                            setUserWon(false)
                        }

                        db.collection("CHALLENGES").doc(doc.id).update({isComplete: true, winner: user_win})
                        .then(() => {
                          handleClickOpen()
                        })
                        .catch((err) => {
                          console.log(err)
                        })
                    })
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
      {open && 
          <Dialog open={open} onClose={handleClose} disableBackdropClick={true}>
          <DialogTitle id="simple-dialog-title">End of challenge</DialogTitle>
          <DialogContent>
              {userWon ? 
              <p>Congratulations you are the winner of the challenge : {challengeName} <br/>
              The total reps performed are : {winner} - {winnerReps} vs {loser} - {loserReps} <br/>
              {amount}$ will be donated </p> : <p>Unfortunately you lost this challenge : {challengeName}, great effort ! <br/>
              The total reps performed are : {winner} - {winnerReps} vs {loser} - {loserReps} <br/>
              {amount}$ will be donated </p>}
              <Button color="danger" onClick={handleClose}>Close</Button>
          </DialogContent>
      </Dialog>
      }
    </div>
  );
}
