//import {db} from "firebase"
import {db} from "../../firebase"
/*eslint-disable*/
import React, {useRef, useState,useEffect} from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// custom components
import CardFriends from "components/FriendsCards/CardFriends";
import CardFriendsText from "components/FriendsCards/CardFriendsText";
import ListFriendsList from "components/Lists/ListFriendsList"

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from "components/CustomButtons/Button.js";
import Alert from '@material-ui/lab/Alert';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import {useAuth} from "context/authContext.js"



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
  inputButton: {
    margin: "0px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    height: '56px',

  },
  center:{
    display:'flex',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '27px 0px 0px 0px'
  },
  codeInput: {
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",

  },

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
  },
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
  inputButton: {
    margin: "0px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    height: '56px',

  },
  center:{
    display:'flex',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '27px 0px 0px 0px'
  },
  codeInput: {
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",

  },
}));




export default function Friends() {
  const classes = useStyles();
  const { currentUser, currentUserInfo } = useAuth()
  const code = currentUserInfo ? currentUserInfo.code : ''
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const textRef = useRef()

  
  const codeRef = useRef()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentUserFriends, setCurrentUserFriends] = useState([])
  const uid = currentUser ? currentUser.uid : ''

  /**
   * Deletes the user friend from his friend list.
   *
   * @param {string} friend_code The friend identifier.
   * @param {string} uid The user identifier.
   */
  function deleteFriend(friend_code, uid) {
    setError("")
    if(uid && friend_code){
      
      db.collection("USERS").doc(uid).collection('FRIENDS').where('code', '==', friend_code)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
          
        });
        let updatedFriends = currentUserFriends.filter(r => r.code !== friend_code)
        setCurrentUserFriends(updatedFriends)
        setStatus("Friend removed")


        
      })
      .catch(function(error) {
        setStatus('')
        setError('Error deleting friends')
        
      });
     }

  }

  /**
   * Copy the user code.
   *
   * @param {Object} e The event triggered.
   */
  function copyCodeToClipboard(e){
    e.preventDefault()
    try {
      setStatus('')
      setError('')
      const el = textRef.current
      
      el.select()
      document.execCommand("copy")
      setCopied(true)
      setStatus('Code copied!')
    }catch {
      setCopied(false)
      setStatus('')
      setError('Failed to copy')
    }
    
  }

  /**
   * Gets all the users in the system.
   *
   */
  function fetchSystemUsers() {
    db.collection('USERS')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach((doc) => {
              setUsers((user) => [...user, doc.data()])
            })
          }
        ).catch((error) => {
          setStatus('')
          setError('Failed to get users', error)
        })

  }

  /**
   * Gets all the friends of the logged in user in the system.
   *
   * @param {string} uid The user identifier.
   */
  function fetchUserFrienList(uid) {
  if(uid)
    db.collection("USERS").doc(uid).collection('FRIENDS')
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            setCurrentUserFriends(friend => [...friend, doc.data()])
        })
    })
    .catch(function(error) {
      setStatus('')
      setError("Error getting friends: ", error);
    });

  }

   /**
   * Gets all the friends of the logged in user in the system.
   * 
   * @returns {Map}  user friend list without duplicates.
   */
  const filteredFriends = () => {
  return currentUserFriends.filter((arr, index, self) =>
  index === self.findIndex((t) => (t.code === arr.code && t.code !== code)))
  };

  /**
   * Add friends to the user friend list.
   * 
   * @param {Object} e The event triggered..
   */
  async function handleSubmit(e) {
     e.preventDefault()
     const code = codeRef.current.value
    setLoading(true)
    fetchSystemUsers(code)
    fetchUserFrienList(uid)
    setLoading(false)
     let u = false
     let f = false
     users.forEach((user)=> {
      if(user.code == code){
        u = true
      }
    })
    
    //let pp = currentUserFriends.filter( (ele, ind) => ind === currentUserFriends.findIndex( elem => elem.code === ele.code))
    //setCurrentUserFriends(pp)
    currentUserFriends.forEach((friend) => {
      if(friend.code == code){
        f = true
      }
         
   })
    
    if(code == ''){
      setStatus('')
      return setError('Please enter a valid code')
    }
    if(currentUserInfo.code == code){
      setStatus('')
      return setError("Cannot add yourself as friend")
    }
    if(f) {
      
      setStatus('')
      return setError('User is already in friend list')
      
    }
    if(u == false){
      
      setStatus('')
      return setError('User is not in the system')

    }
    if(f == false && u && code){
        const friendData = users.filter((arr, index, self) =>
        index === self.findIndex((t) => (t.code === code)))
        

            db.collection('USERS').doc(uid).collection('FRIENDS').doc().set({
              code: friendData[0].code,
              initial: friendData[0].initial,
              firstname: friendData[0].firstname,
              lastname: friendData[0].lastname

            }).then( () => {
              setError('')
              setStatus('Friend added')
            }).catch((error) => {
              setStatus('')
              setError('Failed to add friend', error)
              
            })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchSystemUsers()
    fetchUserFrienList(uid)
    setLoading(false)
  }, [])
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
      {status && <Alert severity="success">{status}</Alert>}
       {error && <Alert severity="error">{error}</Alert>}
        <CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
            <Card >
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{'Add Friends'}</h4>
              </CardHeader>
              <CardBody>
                  <div className={classes.center}>
                  <form onSubmit={handleSubmit}noValidate>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor={'friend-code'}>
                          {'Code'}
                      </InputLabel>
                      <OutlinedInput 
                          readOnly={false} 
                          className={classes.codeInput}
                          defaultValue={''}
                          inputRef={codeRef}
                          id={'friend-input'}
                          labelWidth={70} /> 
                    </FormControl>
                    <FormControl>
                      <Button type="submit" className={classes.inputButton} color="primary">{'Add'}</Button>
                    </FormControl>
                    </form>
                  </div>
              </CardBody>
          </Card>

            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card >
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>{"Share Your Code"}</h4>
                  </CardHeader>
                  <CardBody>
                      <div className={classes.center}>
                        <FormControl variant="outlined">
                          <InputLabel htmlFor={'user-code'}>
                              {"Your code"}
                          </InputLabel>
                          <OutlinedInput 
                              inputRef={textRef}
                              readOnly={true} 
                              className={classes.codeInput}
                              value={code}
                              id={'user-code'}
                              labelWidth={70} /> 
                         
                        </FormControl>
                        <FormControl>
                          <Button onClick={copyCodeToClipboard} className={classes.inputButton} color="primary">{'Copy'} </Button>
                        </FormControl>
                      </div>
                  </CardBody>
              </Card>
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
              <List dense className={classes.root}>
                {filteredFriends().map((item, index) =>
                <div key={index} >
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar className={classes.friend} alt={item.usernfirstnameame} >{item.initial}</Avatar>
                    </ListItemAvatar>
                    <ListItemText id='labelId'
                    primary={item.firstname + ' ' + item.lastname}
                    secondary={item.code}
                    />
                      <ListItemSecondaryAction style={{right: '0px'}}>
                      <IconButton onClick={() => {deleteFriend(item.code, uid)}} edge="end" aria-label="delete">
                            <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
                </div>
                )}
                
            </List>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
