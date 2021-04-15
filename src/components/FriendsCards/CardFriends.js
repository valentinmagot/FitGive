/*eslint-disable*/
import React, {useRef, useState, useEffect} from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';

import {useAuth} from "context/authContext.js"
import {db} from "../../firebase"

const styles = {

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
  codeInput: {
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",

  },
  center:{
    display:'flex',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '27px 0px 0px 0px'
  },
  
};

const useStyles = makeStyles(styles);



export default function CardFriends(props) {
   
  const classes = useStyles();
  const codeRef = useRef()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const { currentUser, currentUserInfo } = useAuth()
  const [currentUserFriends, setCurrentUserFriends] = useState([])
  const uid = currentUser ? currentUser.uid : ''
  //const friendList = currentUserFriends ? currentUserFriends : ''
  

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

  function fetchUserFrienList(uid) {
    if(uid)
      db.collection("USERS").doc(uid).collection('FRIENDS')
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
              setCurrentUserFriends(friend => [... friend, doc.data()])
          })
          
      })
      .catch(function(error) {
        setStatus('')
        setError("Error getting friends: ", error);
      });

  }


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

      currentUserFriends.forEach((friend) => {
        if(friend.code == code){
          f = true
        }
           
     })
      console.log(u)
      console.log(f)
      if(code == ''){
        setStatus('')
        return setError('Please enter a valid code')
      }
      if(currentUserInfo.code == code){
        setStatus('')
        return setError("Cannot add yourself as friend")
      }
      if(f) {
        console.log('user is friend')
        setStatus('')
        return setError('User is already in friend list')
        
      }
      if(u == false){
        console.log('user is undifined')
        setStatus('')
        return setError('User is not in the system')

      }
      if(f == false && u && code){


              db.collection('USERS').doc(uid).collection('FRIENDS').doc().set({
                code : codeRef.current.value
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
    <Card >
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{props.header}</h4>
        </CardHeader>
        <CardBody>
        {error
        ? <Alert severity="error">{error}</Alert>
        : ''
        }
        {status
        ? <Alert severity="success">{status}</Alert>
        :''
        }
            <div className={classes.center}>
            <form onSubmit={handleSubmit}noValidate>
              <FormControl variant="outlined">
                <InputLabel htmlFor={props.inputId}>
                    {props.label}
                </InputLabel>
                <OutlinedInput 
                    readOnly={props.isReadOnly} 
                    className={classes.codeInput}
                    defaultValue={props.placeholder}
                    inputRef={codeRef}
                    id={props.inputId}
                    labelWidth={70} /> 
              </FormControl>
              <FormControl>
                <Button type="submit" className={classes.inputButton} color="primary">{props.buttonText}</Button>
              </FormControl>
              </form>
            </div>
        </CardBody>
    </Card>
  );
}

CardFriends.defaultProps = {
    header: 'header',
    label: 'label',
    placeholder: 'placeholder',
    buttonText: 'button',
    isReadOnly: false,
    inputId: 'outlined-code',
}