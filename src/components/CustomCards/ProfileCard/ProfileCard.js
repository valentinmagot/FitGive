import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardAvatar from "components/Card/CardAvatar.js";
import Button from "components/CustomButtons/Button.js";
import Divider from '@material-ui/core/Divider';
import ProfileAvatar from 'components/ProfileAvatar/ProfileAvatar'


import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";


const useStyles = makeStyles(styles);

export default function ProfileCard(props) {
  const classes = useStyles();
  return (
    <div>
      <Card profile >
        <CardAvatar profile>
          <ProfileAvatar 
          initial = {props.initial}
          />
        </CardAvatar>
        <CardBody profile>
          <h6 className={classes.cardCategory}>{props.userCode}</h6>
          <h4 className='user-name'>{props.userFirstName} {props.userLastName}</h4>
          {/* <Divider />
          <p className={classes.description}>{props.userBio}</p>
          <Button color="main" >
            {props.buttonText}
          </Button> */}
        </CardBody>
      </Card>
    </div>
  );
}

