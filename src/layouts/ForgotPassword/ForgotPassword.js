import React, {useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';

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
    marginTop: theme.spacing(1),
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

export default function ForgotPassword() {
  const classes = useStyles();
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  async function handleSubmit(e) {
    e.preventDefault()

      try {
        setMessage('')
        setError('')
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Check your inbox for further instructions')
        setLoading(false)
        // history.push("/update-password")
      } catch {
        setError('Failed reset password.')
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
          Reset Password
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={emailRef}
          />
          <Button
            type="submit"
            fullWidth
            color="primary"
            disabled={loading}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
            <Link id='signInLink' to='/signin' >
              <p id='signIn' className={classes.links} >
                Sign In
              </p>
              </Link>
            </Grid>
            <Grid item>
              <Link id='signUpLink' to='/signup'>
                <p id='signUp' className={classes.links} variant="body2" >{"Sign Up"}</p>
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

