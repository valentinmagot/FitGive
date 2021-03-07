import '@testing-library/jest-dom' 
import Friends from '../views/Friends/Friends'
import CardFriends from '../components/FriendsCards/CardFriends'
import ListFriendsList from '../components/Lists/ListFriendsList'

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


  test(" 'Add friends' card should render", () => {
    expect(wrapper.containsMatchingElement( 
      <CardFriends
        header="Add Friends"
        label="Code"
        placeholder=''
        buttonText="Add"
        isReadOnly={false}
      />          
    )).toBeTruthy()
  });

  test(" 'Share your code' card should render", () => {
    expect(wrapper.containsMatchingElement( 
      <CardFriends
        header="Share Your Code"
        label="Your code"
        placeholder='#647568'
        buttonText="Copy"
        isReadOnly={true}
        inputId='outlined-code-2'

      />       
    )).toBeTruthy()
  });

  test('Page second card title should render', () => {
    expect(wrapper.find('#second-card-title').text()).toContain('Friends List')
  });

  test('Friend list component should render', () => {
    expect(wrapper.containsMatchingElement(<ListFriendsList />)).toBeTruthy()
  });


});
