import '@testing-library/jest-dom' 
import Dashboard from './Dashboard'
import StatCard from '../../components/CustomCards/StatCard/StatCard'
import ProfileCard from '../../components/CustomCards/ProfileCard/ProfileCard'
import ChartCard from '../../components/CustomCards/ChartCard/ChartCard'

import React from 'react'

import * as AuthContext from '../../context/authContext'

import {configure, shallow } from "enzyme"
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
    currentUserInfo : {
      code : '1234',
      firstname : 'JOHN',
      lastname : 'SMITH',
      initial : 'JS'
    }
    
  };
  props = {
    code : contextValues.currentUserInfo.code,
    firstname : contextValues.currentUserInfo.firstname,
    lastname : contextValues.currentUserInfo.lastname,
    initial : contextValues.currentUserInfo.initial
  }
  jest
    .spyOn(AuthContext, 'useAuth')
    .mockImplementation(() => contextValues);
  wrapper = shallow(<Dashboard />);
  wrapper.setProps({
    code : props.code,
    firstname : props.firstname,
    lastname : props.lastname,
    initial : props.initial,
    
  })
});

describe("Dashboard page testing", () => {
  
  // test('User profile card renders', () => {
  //   expect(wrapper.containsMatchingElement( 
  //     <ProfileCard
  //       userCode={props.code}
  //       userFirstName={props.firstname}
  //       userLastName={props.lastname}
  //       initial={props.initial}
  //     />
  //   )).toBeTruthy()
  // });


  test('Challenges won stat card renders', () => {
    expect(wrapper.containsMatchingElement( 
    <StatCard 
      cardTitle= 'Challenges Won'
      cardStat= '2'
      cardLink= 'see details'
      cardIcon= 'emoji_events'
      cardHeader= 'warning'
      cardLinkIcon='link'
    />)).toBeTruthy()
  });

  test('Challenges lost stat card renders', () => {
    expect(wrapper.containsMatchingElement( 
    <StatCard 
      cardTitle= 'Challenges Lost'
      cardStat= '0'
      cardLink= 'see details'
      cardIcon= 'cancel'
      cardHeader= 'danger'
      cardLinkIcon='link'
    />)).toBeTruthy()
  });

  test('Friends stat card renders', () => {
    expect(wrapper.containsMatchingElement( 
    <StatCard 
      cardTitle= 'Friends'
      cardStat= '3'
      cardLink= 'just updated'
      cardIcon= 'accessibility'
      cardHeader= 'info'
      cardLinkIcon='access_time'
    />)).toBeTruthy()
  });

  test('Money accumulated stat card renders', () => {
    expect(wrapper.containsMatchingElement( 
      <StatCard 
      cardTitle= 'Money Pledged'
      cardStat= '20$'
      cardLink= 'just updated'
      cardIcon= 'local_atm'
      cardHeader= 'success'
      cardLinkIcon='access_time'
    />)).toBeTruthy()
  });

  test('Calories burned chart renders', () => {
    expect(wrapper.containsMatchingElement(
      <ChartCard 
        cardTitle='Calories Burned'
        cardHeader='primary'
        cardSubTitle='Total calories burned during exercises'
        cardStatus='Updated 1 minute ago'
        cardStatusIcon='access_time'
        cardChartType='Bar'
        cardVariableData={caloriesBunedChart.data}
        cardVariableOptions={caloriesBunedChart.option}
        cardVariableResponsiveOptions={caloriesBunedChart.responsiveOptions}
        cardVariableAnimation={caloriesBunedChart.animation}
    
      />
    )).toBeTruthy()
  })

  test('Money generated chart renders', () => {
    expect(wrapper.containsMatchingElement(
      <ChartCard 
        cardTitle='Money Donated'
        cardHeader='primary'
        cardSubTitle='Amount of money donated to charities.'
        cardStatus='updated 12 days ago'
        cardStatusIcon='access_time'
        cardChartType='Line'
        cardVariableData={moneyGeneratedChart.data}
        cardVariableOptions={moneyGeneratedChart.option}
        cardVariableResponsiveOptions={moneyGeneratedChart.responsiveOptions}
        cardVariableAnimation={moneyGeneratedChart.animation}
    
      />
    )).toBeTruthy()
  })

  test('Workout time chart renders', () => {
    expect(wrapper.containsMatchingElement(
      <ChartCard 
        cardTitle='Workout time'
        cardHeader='primary'
        cardSubTitle='Total workout minutes of the week'
        cardStatus='Updated 1 minute ago'
        cardStatusIcon='access_time'
        cardChartType='Bar'
        cardVariableData={workoutTimeChart.data}
        cardVariableOptions={workoutTimeChart.option}
        cardVariableResponsiveOptions={workoutTimeChart.responsiveOptions}
        cardVariableAnimation={workoutTimeChart.animation}
    />
    )).toBeTruthy()
  })


  test('Community growth chart renders', () => {
    expect(wrapper.containsMatchingElement(
      <ChartCard 
        cardTitle='Comunity growth'
        cardHeader='primary'
        cardSubTitle='Commutnity growth over the year'
        cardStatus='updated 2 days ago'
        cardStatusIcon='access_time'
        cardChartType='Line'
        cardVariableData={communityGrowthChart.data}
        cardVariableOptions={communityGrowthChart.option}
        cardVariableResponsiveOptions={communityGrowthChart.responsiveOptions}
        cardVariableAnimation={communityGrowthChart.animation}
    />
    )).toBeTruthy()
  })


});
