import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useAuth} from '../../context/authContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#5e86c7',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  links:{
    cursor: 'pointer',
    color: '#3f51b5',
    "&:hover": {
      color: '#3f51b5',
    }
  },
  copyright:{
    cursor: 'pointer',
    color: 'rgba(0, 0, 0, 0.54)',
    "&:hover": {
      color: 'rgba(0, 0, 0, 0.54)',
    }
  }
}));

/**
   * Sets the copyright at the bottom of the form
   */
function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <a className={classes.copyright} color="inherit" href="https://github.com/valentinmagot/FitGive">
        FitGive
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const classes = useStyles();
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  /**
   * Signs up the user for the application.
   * The makes sure that the passwords match
   *
   * @param {Object} e The event triggered.
   */
  async function handleSubmit(e) {
    e.preventDefault()

    const firstname = firstnameRef.current.value
    const lastname = lastnameRef.current.value
    const firstname_0 = firstname ? firstname.charAt(0).toUpperCase(): ''
    const lastname_0 = lastname ? lastname.charAt(0).toUpperCase() : ''
    const initial = firstname_0 && lastname_0 ? firstname_0 + lastname_0 : ''

    if(passwordRef.current.value !== 
      passwordConfirmRef.current.value){
        return setError('Passwords do not match')
      }

      try {
        setError('')
        setLoading(true)
        await signup(firstname, lastname, initial, emailRef.current.value, passwordRef.current.value)
        setLoading(false) 
        history.push("/app/dashboard")     
      } catch {
        setError('Failed to create an account')
        setLoading(false)
      }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                inputRef={firstnameRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={lastnameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password confirm"
                label="Confirm Password"
                type="password"
                id="password-confirm"
                autoComplete="current-password"
                inputRef={passwordConfirmRef}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="primary"
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <Link id='signInLink' to='/signin' >
              <p id='alreadyOwnAccountLink' className={classes.links} >
                Already have an account? Sign in
              </p>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}