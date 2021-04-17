/*eslint-disable*/
import React from "react";
import { useState, useEffect } from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import ChallengeList from "components/Lists/ChallengeList"
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import CustomCarousel from 'components/Carousel/CustomCarousel';

//db
import { useAuth } from "context/authContext.js"
import { db } from "../../firebase"


const useStyles = makeStyles(styles);

export default function Challenges() {
  const classes = useStyles();
  const { currentUser, currentUserInfo } = useAuth()
  const userID = currentUserInfo ? currentUserInfo.code : ''
  const [userPastChallenges, setPastChallenges] = useState([])

  /**
   * Gets all the challenges that the user already finished.
   * 
   */
  const fetchPastChallenges = () => {
    let query = db.collection("CHALLENGES")
    query = query.where('participants', "array-contains", userID)
    query = query.where("isComplete", "==", true)
    query.get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPastChallenges(userChallenges => [...userChallenges, doc.data()]);
        });

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  useEffect(() => {
    fetchPastChallenges()
  }, [])


  return (
    <>
      <Link id='newChallenge' to='/app/new-challenge' >
        <Button color="primary" style={{ float: "right", marginBottom: "3em" }}>New Challenge</Button>
      </Link>
      <GridContainer style={{ display: "block" }}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ongoing Challenges</h4>
            <p className={classes.cardCategoryWhite}>
              Check out all your ongoing challenges.
            </p>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <CustomCarousel />
            </GridItem>
          </CardBody>
        </Card>


        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Past Challenges</h4>
            <p className={classes.cardCategoryWhite}>
              Check out all your completed challenges.
              </p>
          </CardHeader>
          <CardBody>
            <GridItem xs={12} sm={12} md={12}>
              <ChallengeList data={userPastChallenges} />
            </GridItem>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
