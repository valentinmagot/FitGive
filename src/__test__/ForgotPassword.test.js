import'@testing-library/jest-dom' 
import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";


import {configure, shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import * as AuthContext from '../context/authContext'
import ForgotPassword from '../layouts/ForgotPassword/ForgotPassword';

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  const contextValues = { currentUser: 'John' };
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<ForgotPassword />);
});



describe('<ForgotPassword />', () => {
  test('LockOutlinedIcon should render', () => {
    const icon = wrapper.containsMatchingElement( 
            <LockOutlinedIcon />
          );
    expect(icon).toBeTruthy();
  });

    test("Page title should render", () => {
      expect(wrapper.containsMatchingElement( 
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
      )).toBeTruthy()
    });

      test("Email input field should render", () => {
        const emailInput = wrapper.find('#email')
        expect(emailInput).toBeTruthy()
      });

        test("Button should render", () => {
          expect(wrapper.containsMatchingElement( 
              <Button
                type="submit"
                fullWidth
                color="primary"
              >
                Reset Password
              </Button>
          )).toBeTruthy()
      });

      test("Sign in link route should be right", () => {
        expect(wrapper.find("#signUpLink").prop('to')).toEqual('/signup')
      });

      test("Sing in link should render", () => {
          expect(wrapper.find('#signIn').text()).toEqual('Sign In')
      });

      test("Sing up link route should be right", () => {
        expect(wrapper.find("#signUpLink").prop('to')).toEqual('/signup')
      });

      test("Sign up link should render", () => {
        expect(wrapper.find('#signUp').text()).toEqual('Sign Up')
    });


});

