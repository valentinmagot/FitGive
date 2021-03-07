import'@testing-library/jest-dom' 
import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";


import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import * as AuthContext from '../context/authContext'
import Signup from '../layouts/SignUp/SignUp';

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  const contextValues = { currentUser: 'John' };
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<Signup />);
});

describe("<SignUp />", () => {

  test('LockOutlinedIcon should render', () => {
    const icon = wrapper.containsMatchingElement( 
            <LockOutlinedIcon />
          );
    expect(icon).toBeTruthy();
  });

  test("Page title should render", () => {
      expect(wrapper.containsMatchingElement( 
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      )).toBeTruthy()
  });

  test("First name input field should render", () => {
      const firstnameInput = wrapper.find('#firstname')
      expect(firstnameInput).toBeTruthy()
  })

  test("Last name input field should render", () => {
      const lastnameInput = wrapper.find('#lastname')
      expect(lastnameInput).toBeTruthy()
  });

  test("Email input field should render", () => {
      const emailInput = wrapper.find('#email')
      expect(emailInput).toBeTruthy()
  });

  test("Password input field should render", () => {
      const passwordInput = wrapper.find('#password')
      expect(passwordInput).toBeTruthy()
  });

  test("Confirm password input field should render", () => {
      const confirmPasswordInput = wrapper.find('#password-confirm')
      expect(confirmPasswordInput).toBeTruthy()
  });

  test("Button should render", () => {
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

  test("Already have account route should be right", () => {
    expect(wrapper.find("#signInLink").prop('to')).toEqual('/signin')
  });

  test("Already have account link should render", () => {
      expect(wrapper.find('#alreadyOwnAccountLink').text()).toEqual('Already have an account? Sign in')
  });


});
