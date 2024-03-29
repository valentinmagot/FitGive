import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  friend: {
    color: "#fff",
    backgroundColor: "#5e86c7"
  }
}));



export default function AlignItemsList(props) {
  const classes = useStyles();
  const data = props.data;
  const uid = props.uid;

  const filteredFriends = () => {
    return data.filter((arr, index, self) =>
    index === self.findIndex((t) => (t.code === arr.code && t.code !== uid)))
  };

  return (
    <List dense className={classes.root}>
        {filteredFriends().map((item, index) =>
        <div key={index} >
         <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar className={classes.friend} alt={item.usernfirstnameame} >{item.initial}</Avatar>
            </ListItemAvatar>
            <ListItemText id='labelId'
            primary={item.firstname + ' ' + item.lastname}
            secondary={'Challenge your friends'}
            />
              <ListItemSecondaryAction style={{right: '0px'}}>
                <FormControlLabel
                 control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checked" />}
                 labelPlacement="end"
            />
            </ListItemSecondaryAction>
         </ListItem>
        <Divider variant="inset" component="li" />
        </div>
        )}
        
    </List>
  );
}