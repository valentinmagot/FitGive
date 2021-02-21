/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// custom components
import CardFriends from "components/FriendsCards/CardFriends";
import ListFriendsList from "components/Lists/ListFriendsList"

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  copyButton: {
    margin: "0px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
  }
};
const dummyData = [
  {
    id: 0,
    inital: 'VM',
    username: 'Valentin',
    profilePicture: '',
    quickStats: 'Completed 5 challenges in the past month.'
  }, {
    id: 1,
    inital: 'EL',
    username: 'Ellen',
    profilePicture: '',
    quickStats: 'Completed 2 challenges in the past month.'
  }, {
    id: 2,
    inital: 'HE',
    username: 'Herve',
    profilePicture: '',
    quickStats: 'Completed 1 challenges in the past month.'
  }
];


const useStyles = makeStyles(styles);

export default function Friends() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <CardFriends
                header="Add Friends"
                label="Code"
                placeholder=''
                buttonText="Add"
                isReadOnly={false}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CardFriends
                header="Share Your Code"
                label="Your code"
                placeholder='#647568'
                buttonText="Copy"
                isReadOnly={true}
                inputId='outlined-code-2'

              />
            </GridItem>
          </GridContainer>
        </CardBody>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 id='second-card-title' className={classes.cardTitleWhite}>Friends List</h4>
          </CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <ListFriendsList data={dummyData} />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
