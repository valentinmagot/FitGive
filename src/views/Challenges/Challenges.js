/*eslint-disable*/
import React from "react";
import { useState } from "react";

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



const useStyles = makeStyles(styles);

// const fetchPastChallenges = () => {
//   let query = db.collection("CHALLENGES")
//   query = query.where('participants', "array-contains",userID)
//   query = query.where("isComplete", "==", true)
//       query.get()
//       .then((querySnapshot) => {
//           querySnapshot.forEach((doc) => {
//               const document = {
//                   id: doc.id,
//                   data: doc.data()
//               }
//               setPastChallenges(userChallenges => [...userChallenges, document]);
//               console.log(document)
//           });
          
//       })
//       .catch((error) => {
//           console.log("Error getting documents: ", error);
//       });
// }



export default function Challenges() {
  const classes = useStyles();
  const dummyData = [
    {
      id: 0,
      challengeName: 'Exercising with my Pals',
      quickStats: 'Completed 25 sit-ups a day for 10 days.'
    }, {
      id: 1,
      challengeName: 'My First Challenge!',
      quickStats: 'Completed 5 push-ups a day for 30 days.'
    },
  ];
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
              <ChallengeList data={dummyData} />
            </GridItem>
          </CardBody>
        </Card>
      </GridContainer>
    </>
  );
}
