import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from "components/CustomButtons/Button.js";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Links from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";


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
    "&:hover": {
      color: '#3f51b5',
    }
  },
}));

export default function Signin() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link id='signInLink' to='/app/dashboard' >
          <Button
            type="submit"
            fullWidth
            color="primary"
          >
            Sign In
          </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              <Links id='forgortPasswordLink' className={classes.links}  variant="body2">
                Forgot password?
              </Links>
            </Grid>
            <Grid item>
              <Link id='signUpLink' to='/signup'>
                <Links id='createAccountLink' className={classes.links} variant="body2" >{"Don't have an account? Sign Up"}</Links>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

