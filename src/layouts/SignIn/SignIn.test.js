import '@testing-library/jest-dom' 
import SignIn from './SignIn'

import React from 'react'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";


import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<SignIn />)
});


describe("SignIn page testing", () => {

  test("SingIn page avatar LockOutlinedIcon should render", () => {
    expect(wrapper.containsMatchingElement( 
          <LockOutlinedIcon />
    )).toBeTruthy()
  });

  test("SingIn page title should render", () => {
    expect(wrapper.containsMatchingElement( 
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
    )).toBeTruthy()
  });

  test("SingIn email input field should render", () => {
    expect(wrapper.containsMatchingElement( 
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
    )).toBeTruthy()
  });

  test("SingIn password input field should render", () => {
    expect(wrapper.containsMatchingElement( 
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
    )).toBeTruthy()
  });

  test("SingIn button should render", () => {
      expect(wrapper.containsMatchingElement( 
          <Button
            type="submit"
            fullWidth
            color="primary"
          >
            Sign In
          </Button>
      )).toBeTruthy()
  });

  test("SingIn button route should be right", () => {
    expect(wrapper.find("#signInLink").prop('to')).toEqual('/app/dashboard')
  });

  test("SingIn forgot passord link should render", () => {
      expect(wrapper.find('#forgortPasswordLink').text()).toEqual('Forgot password?')
  });

  test("SingIn dont own account route should be right", () => {
    expect(wrapper.find("#signUpLink").prop('to')).toEqual('/signup')
  });

  test("SingIn dont own account link should render", () => {
    expect(wrapper.find('#createAccountLink').text()).toEqual(`Don't have an account? Sign Up`)
});


});
