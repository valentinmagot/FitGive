import '@testing-library/jest-dom'

import ProfileCard from './ProfileCard'
import React from 'react'
import Button from "components/CustomButtons/Button.js";

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import image from 'assets/img/faces/baller.jpg';

let wrapper;
let props;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<ProfileCard />)
  props = {
      userImage: image,
      userCode: '#00000',
      userName: 'User Name',
      userBio: 'This is a user bio',
      buttonText: 'Edit profi1le'
  }
  wrapper.setProps({
    userImage: props.userImage,
    userCode: props.userCode,
    userName: props.userName,
    userBio: props.userBio,
    buttonText: props.buttonText
  })
});


describe("ProfileCard component testing", () => {

  test('ProfileCard user iamge should render', () => {
    expect(wrapper.find('img').prop('src')).toEqual(props.userImage)
  });

  test('ProfileCard user iamge alt text should be set', () => {
    expect(wrapper.find('img').prop('alt')).not.toBeNull()
  });
  
  test('ProfileCard user code should render', () => {
    expect(wrapper.find('h6').text()).toContain(props.userCode)
  });

  test('ProfileCard user name should render', () => {
    expect(wrapper.find('h4').text()).toContain(props.userName)
  });
  
  test('ProfileCard user bio should render', () => {
    expect(wrapper.find('p').text()).toContain(props.userBio)
  });

  test('ProfileCard button render', () => {
    expect(wrapper.find(Button)).toHaveLength(1)
  });

  test('ProfileCard button text should render', () => {
    expect(wrapper.find(Button).children(0).text()).toContain(props.buttonText);
  });

});
