import '@testing-library/jest-dom' 
import StatCard from '../components/CustomCards/StatCard/StatCard'
import Icon from "@material-ui/core/Icon";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";

import React from 'react'

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

let wrapper;
let props;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<StatCard />)
  props = {
      cardTitle: 'Challenges won',
      cardStat: '4',
      cardLink: 'see details',
      cardIcon: 'emoji_events',
      cardHeader: 'warning',
      cardLinkIcon: 'link'
  }
  wrapper.setProps({
      cardTitle: props.cardTitle,
      cardStat: props.cardStat,
      cardLink: props.cardLink,
      cardIcon: props.cardIcon,
      cardHeader: props.cardHeader,
      cardLinkIcon: props.cardLinkIcon,
})
});


describe("StatCard component testing", () => {
  

  test('StatCard title should render', () => {
    expect(wrapper.find('p').text()).toContain(props.cardTitle)
  });

 

  test('StatCard header color should render', () => {
    const cardHeader = wrapper.find(CardHeader)
    expect(cardHeader.prop('color')).toEqual(props.cardHeader) 
  });

  test('StatCard icon color should render', () => {
    const cardIcon = wrapper.find(CardIcon)
    expect(cardIcon.prop('color')).toEqual(props.cardHeader) 
  });

  test('StatCard icon should render', () => {
    expect(
        wrapper.containsMatchingElement(<Icon>{props.cardIcon}</Icon>)).toBeTruthy()
  });

  test('StatCard stat should render', () => {
    expect(wrapper.find('h3').text()).toContain(props.cardStat)
  });

  test('StatCard card link icon should render', () => {
    expect(
        wrapper.containsMatchingElement(<Icon>{props.cardLinkIcon}</Icon>)).toBeTruthy()
  });

  test('StatCard card link should render', () => {
    expect(wrapper.find('a').text()).toContain(props.cardLink)
  });


});
