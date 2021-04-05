import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

//db
import {useAuth} from "context/authContext.js"


export default function AlignItemsList(props) {
  const classes = useStyles();
  const { currentUserInfo} = useAuth()
  const userID = currentUserInfo ? currentUserInfo.code : ''
  const data = props.data;

  return (
    <List dense className={classes.root}>
      {data.map((item, index) =>
        <div key={index} >
          <ListItem alignItems="flex-start">
            <ListItemText id='labelId'
              primary={item.challengeName + ' - ' + item.exercise}
              secondary={item.description}
            />
            {item.winner == userID ? <h4>Won</h4> : <h4>Lost</h4>}
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      )}
    </List>
  );
}
