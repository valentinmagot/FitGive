import React from 'react';
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
}));



export default function AlignItemsList() {
  const classes = useStyles();

  const dummyData = [
    {
      id: 0,
      username: 'Remy Sharp',
      profilePicture: '',
      quickStats: 'Completed 0 challenge in the past mounth.'
    }, {
      id: 1,
      username: 'Travis Howard',
      profilePicture: '',
      quickStats: 'Completed 2 challenge in the past mounth.'
    }, {
      id: 2,
      username: 'Cindy Baker',
      profilePicture: '',
      quickStats: 'Completed 1 challenge in the past mounth.'
    }
  ];

  return (
    <List dense className={classes.root}>
        {dummyData.map((item, index) =>
        <div key={index} >
         <ListItem alignItems="flex-start">
            <ListItemAvatar>
            <Avatar variant="square" alt={item.username} src={item.profilePicture} />
            </ListItemAvatar>
            <ListItemText id='labelId'
            primary={item.username}
            secondary={item.quickStats}
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
