import '@testing-library/jest-dom'
import Dashboard from '../views/Dashboard/Dashboard'
import StatCard from '../components/CustomCards/StatCard/StatCard'
import ProfileCard from '../components/CustomCards/ProfileCard/ProfileCard'
import ChartCard from '../components/CustomCards/ChartCard/ChartCard'

import React from 'react'

import * as AuthContext from '../context/authContext'

import { configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import {
  caloriesBunedChart,
  workoutTimeChart,
  moneyGeneratedChart,
  communityGrowthChart
} from "variables/charts.js";

let wrapper;
let props;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  const contextValues = {
    currentUserInfo: {
      code: '1234',
      firstname: 'JOHN',
      lastname: 'SMITH',
      initial: 'JS'
    }

  };
  props = {
    code: contextValues.currentUserInfo.code,
    firstname: contextValues.currentUserInfo.firstname,
    lastname: contextValues.currentUserInfo.lastname,
    initial: contextValues.currentUserInfo.initial
  }
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<Dashboard />);
  wrapper.setProps({
    code: props.code,
    firstname: props.firstname,
    lastname: props.lastname,
    initial: props.initial,

  })
});

const calBurnedData = {
  labels: [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ],
  series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
}
const moneyGeneratedChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [[0, 0, 0, 0, 0, 0, 0]]
}


describe("Dashboard page testing", () => {

  test('User profile card renders', () => {
    expect(wrapper.containsMatchingElement(
      <ProfileCard
        userCode={props.code}
        userFirstName={props.firstname}
        userLastName={props.lastname}
        initial={props.initial}
      />
    )).toBeTruthy()
  });


  test('Challenges won stat card renders', () => {
    expect(wrapper.containsMatchingElement(
      <StatCard
        cardTitle='Challenges Won'
        cardLink='see details'
        cardIcon='emoji_events'
        cardHeader='warning'
        cardLinkIcon='link'
      />)).toBeTruthy()
  });

  test('Challenges lost stat card renders', () => {
    expect(wrapper.containsMatchingElement(
      <StatCard
        cardTitle='Challenges Lost'
        cardLink='see details'
        cardIcon='cancel'
        cardHeader='danger'
        cardLinkIcon='link'
      />)).toBeTruthy()
  });

  test('Friends stat card renders', () => {
    expect(wrapper.containsMatchingElement(
      <StatCard
        cardTitle='Friends'
        cardLink='just updated'
        cardIcon='accessibility'
        cardHeader='info'
        cardLinkIcon='access_time'
      />)).toBeTruthy()
  });

  test('Money accumulated stat card renders', () => {
    expect(wrapper.containsMatchingElement(
      <StatCard
        cardTitle='Money Pledged'
        cardLink='just updated'
        cardIcon='local_atm'
        cardHeader='success'
        cardLinkIcon='access_time'
      />)).toBeTruthy()
  });
});
