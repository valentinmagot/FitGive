import '@testing-library/jest-dom' 
import SignUp from './SignUp'

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
  wrapper = shallow(<SignUp />)
});


describe("SignUp page testing", () => {

  test("SignUp page avatar LockOutlinedIcon should render", () => {
    expect(wrapper.containsMatchingElement( 
          <LockOutlinedIcon />
    )).toBeTruthy()
  });

  test("SignUp page title should render", () => {
    expect(wrapper.containsMatchingElement( 
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
    )).toBeTruthy()
  });

  test("SignUp first name input field should render", () => {
    expect(wrapper.containsMatchingElement( 
        <TextField
        autoComplete="fname"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label="First Name"
        autoFocus
      />
    )).toBeTruthy()
  });

  test("SignUp last name input field should render", () => {
    expect(wrapper.containsMatchingElement( 
        <TextField
        variant="outlined"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="lname"
      />
    )).toBeTruthy()
  });

  test("SignUp email input field should render", () => {
    expect(wrapper.containsMatchingElement( 
        <TextField
        variant="outlined"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
    )).toBeTruthy()
  });

  test("SignUp password input field should render", () => {
    expect(wrapper.containsMatchingElement( 
        <TextField
        variant="outlined"
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

  test("SignUp button should render", () => {
      expect(wrapper.containsMatchingElement( 
        <Button
            type="submit"
            fullWidth
            color="primary"
        >
        Sign Up
      </Button>
      )).toBeTruthy()
  });

  test("SingUp already have account route should be right", () => {
    expect(wrapper.find("#signInLink").prop('to')).toEqual('/signin')
  });

  test("SingUp already have account link should render", () => {
      expect(wrapper.find('#alreadyOwnAccountLink').text()).toEqual('Already have an account? Sign in')
  });


});
