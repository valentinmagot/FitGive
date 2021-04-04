import '@testing-library/jest-dom'
// react plugin for creating charts
import ChartistGraph from "react-chartist"; 
import ChartCard from '../components/CustomCards/ChartCard/ChartCard'
import CardHeader from "components/Card/CardHeader.js";
import Icon from "@material-ui/core/Icon";
import React from 'react'

import {configure, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import {
    caloriesBunedChart
} from "variables/charts.js";

let wrapper;
let props;

beforeAll(() => {
  configure({ adapter: new Adapter() });
});

beforeEach(() => {
  wrapper = shallow(<ChartCard />)
  props = {
      cardTitle: 'Calories burned',
      cardHeader: 'success',
      cardSubTitle: 'Calories burned during challenges performed',
      cardStatus: 'updated 4 minutes ago',
      cardStatusIcon: 'access_time',
      cardChartType: 'Line',
      cardVariableData: caloriesBunedChart.data,
      cardVariableOptions: caloriesBunedChart.option,
      cardVariableResponsiveOptions: caloriesBunedChart.responsiveOptions,
      cardVariableAnimation: caloriesBunedChart.animation,
  }
  wrapper.setProps({
    cardTitle: props.cardTitle,
    cardHeader: props.cardHeader,
    cardSubTitle: props.cardSubTitle,
    cardStatus: props.cardStatus,
    cardStatusIcon: props.cardStatusIcon,
    cardChartType: props.cardChartType,
    cardVariableData: props.cardVariableData,
    cardVariableOptions: props.cardVariableOptions,
    cardVariableResponsiveOptions: props.cardVariableResponsiveOptions,
    cardVariableAnimation: props.cardVariableAnimation
  })
});


describe("ChartCard component testing", () => {
  

  test('ChartCard title should render', () => {
    expect(wrapper.find('h4').text()).toContain(props.cardTitle)
  });

  test('ChartCard subtitle should render', () => {
    expect(wrapper.find('p').text()).toContain(props.cardSubTitle)
  });
 

  test('ChartCard header color should render', () => {
    const cardHeader = wrapper.find(CardHeader)
    expect(cardHeader.prop('color')).toEqual(props.cardHeader) 
  });

  test('ChartCard status should render', () => {
    expect(wrapper.find('#foot').text()).toContain(props.cardStatus)
  });

  test('ChartCard status icon should render', () => {
    expect(
        wrapper.containsMatchingElement(<Icon>{props.cardStatusIcon}</Icon>)).toBeTruthy()
  });

  test('ChartCard diagram should render', () => {
    expect(
        wrapper.containsMatchingElement(
            <ChartistGraph
                className="ct-chart"
                data={props.cardVariableData}
                type={props.cardChartType}
                options={props.cardVariableOptions}
                responsiveOptions={props.cardVariableResponsiveOptions}
                listener={props.cardVariableAnimation}
              />
        )).toBeTruthy()
  });


});
