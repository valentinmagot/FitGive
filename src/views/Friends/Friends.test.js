import '@testing-library/jest-dom' 
import Friends from './Friends'
import CardFriends from '../../components/FriendsCards/CardFriends'
import ListFriendsList from '../../components/Lists/ListFriendsList'

import React from 'react'

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<Friends />)
});


describe("Friends page testing", () => {
  

  test('Page first card title should render', () => {
    expect(wrapper.find('#first-card-title').text()).toContain('Grow your commnunity')
  });

  test('Page first card sub-title should render', () => {
    expect(wrapper.find('#first-card-subtitle').text()).toContain('It is much easier to stick to a challenge with friends by your side.')
  });


  test(" 'Add friends' card should render", () => {
    expect(wrapper.containsMatchingElement( 
      <CardFriends
        header="Add friends"
        label="#342564"
        placeholder=''
        buttonText="Add"
        isReadOnly={false}
      />          
    )).toBeTruthy()
  });

  test(" 'Share your code' card should render", () => {
    expect(wrapper.containsMatchingElement( 
      <CardFriends
        header="Share your code"
        label="Your code"
        placeholder='#647568'
        buttonText="Copy"
        isReadOnly={true}
        inputId='outlined-code-2'

      />       
    )).toBeTruthy()
  });

  test('Page second card title should render', () => {
    expect(wrapper.find('#second-card-title').text()).toContain('Friends list')
  });

  test('Page second card sub-title should render', () => {
    expect(wrapper.find('#second-card-subtitle').text()).toContain('Here is collection of your contacts.')
  });

  test('Friend list component should render', () => {
    expect(wrapper.containsMatchingElement(<ListFriendsList />)).toBeTruthy()
  });


});
