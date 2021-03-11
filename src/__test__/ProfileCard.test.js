import '@testing-library/jest-dom'

import ProfileCard from '../components/CustomCards/ProfileCard/ProfileCard'
import React from 'react'
import Button from "components/CustomButtons/Button.js";

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import ProfileAvatar from 'components/ProfileAvatar/ProfileAvatar'

let wrapper;
let props;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<ProfileCard />)
  props = {
      userCode: '#00000',
      userFirstName: 'User',
      userLastName:'Name',
      userBio: 'This is a user bio',
      buttonText: 'Edit profi1le',
      intial: 'UN'
  }
  wrapper.setProps({
    userCode: props.userCode,
    userFirstName: props.userFirstName,
    userLastName: props.userLastName,
    userBio: props.userBio,
    buttonText: props.buttonText,
    initial: props.initial
  })
});


describe("ProfileCard component testing", () => {

  test('ProfileCard user avatar should render', () => {
    expect(wrapper.containsMatchingElement(
      <ProfileAvatar 
          initial = {props.initial}
      />
    )).toBeTruthy()
  });
  
  test('ProfileCard user code should render', () => {
    expect(wrapper.find('h6').text()).toContain(props.userCode)
  });

  test('ProfileCard user name should render', () => {
    expect(wrapper.find('h4').text()).toContain(props.userFirstName, props.userLastName)
  });

});
