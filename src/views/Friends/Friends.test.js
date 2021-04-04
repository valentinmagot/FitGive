import '@testing-library/jest-dom' 
import Friends from './Friends'
import CardFriends from '../../components/FriendsCards/CardFriends'
import ListFriendsList from '../../components/Lists/ListFriendsList'

import React from 'react'

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import * as AuthContext from '../../context/authContext'

let wrapper;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  const contextValues = { currentUser: {
    code: '1234'
  } 
};
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<Friends />)
});


describe("Friends page testing", () => {


  

  // test(" 'Share your code' card should render", () => {
  //   expect(wrapper.containsMatchingElement( 
  //     <CardFriends
  //       header="Share Your Code"
  //       label="Your code"
  //       placeholder='#647568'
  //       buttonText="Copy"
  //       isReadOnly={true}
  //       inputId='outlined-code-2'

  //     />       
  //   )).toBeTruthy()
  // });

  test('Page second card title should render', () => {
    expect(wrapper.find('#second-card-title').text()).toContain('Friends List')
  });

  


});
