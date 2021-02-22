import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// core components
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    user: {
        color: '#fff',
        backgroundColor: '#34495E',
      },
  }));

export default function ProfileAvatar(props) {
  const classes = useStyles();
  return (
    <div>
          <Avatar style={{width:'80px', height:'80px'}} className={classes.user}>{props.initial}</Avatar>
    </div>
  );
}

