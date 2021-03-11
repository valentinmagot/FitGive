import'@testing-library/jest-dom' 
import React  from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from "components/CustomButtons/Button.js";


import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import * as AuthContext from '../context/authContext'
import Signin from '../layouts/SignIn/SignIn';

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  const contextValues = { currentUser: 'John' };
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<Signin />);
});



describe('<SignIn />', () => {
  test('LockOutlinedIcon should render', () => {
    const icon = wrapper.containsMatchingElement( 
            <LockOutlinedIcon />
          );
    expect(icon).toBeTruthy();
  });

    test("Page title should render", () => {
      expect(wrapper.containsMatchingElement( 
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      )).toBeTruthy()
    });

      test("Email input field should render", () => {
        const emailInput = wrapper.find('#email')
        expect(emailInput).toBeTruthy()
      });

      test("Password input field should render", () => {
        const passwordInput = wrapper.find('#password')
        expect(passwordInput).toBeTruthy()
      });

        test("Button should render", () => {
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
        expect(wrapper.find("#signUpLink").prop('to')).toEqual('/signup')
      });

      test("Forgot password route should be right", () => {
        expect(wrapper.find("#forgotPasswordLink").prop('to')).toEqual('/forgot-password')
      });

      test("Forgot password link should render", () => {
          expect(wrapper.find('#forgortPassLink').text()).toEqual('Forgot password?')
      });

      test("Create account route should be right", () => {
        expect(wrapper.find("#signUpLink").prop('to')).toEqual('/signup')
      });

      test("Create account link should render", () => {
        expect(wrapper.find('#createAccountLink').text()).toEqual(`Don't have an account? Sign Up`)
      });


});

