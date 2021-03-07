import '@testing-library/jest-dom' 
import CardFriends from '../components/FriendsCards/CardFriends'
import Button from '../components/CustomButtons/Button'
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import React from 'react'

import {configure, mount, shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

let wrapper;
let props;

configure({ adapter: new Adapter() });


beforeEach(() => {
  wrapper = shallow(<CardFriends />)
  props = {
        header: 'Share your code.',
        label: 'Your code',
        placeholder: '#647568',
        buttonText: 'Copy',
        isReadOnly: true,
        inputId: 'outlined-code',
  }
  wrapper.setProps({
        header: props.header,
        label: props.label,
        placeholder: props.placeholder,
        buttonText: props.buttonText,
        isReadOnly: props.isReadOnly,
        inputId: props.inputId
    })
});


describe("Component 'CardFriends' testing", () => {
  

  test('Card header should render', () => {
    expect(wrapper.find('h4').text()).toContain("Share your code.");
  });

  test('Card input label component should render', () => {
    const inputLabel = wrapper.find(InputLabel);
    expect(inputLabel).toHaveLength(1);
  });

  test('Card input label html prop should render', () => {
    const inputLabel = wrapper.find(InputLabel);
    expect(inputLabel.props()).toEqual({
      htmlFor: props.inputId,
      children: "Your code"
    });
  });

  test('Card input label should render', () => {
    const inputLabel = wrapper.find(InputLabel);
    expect(inputLabel.text()).toContain(props.label);
  });

  test('Card Outlined input component should render', () => {
    const outlinedInput = wrapper.find(OutlinedInput);
    expect(outlinedInput).toHaveLength(1);
  });

  test('Card Outlined props should render', () => {
    const outlinedInput = wrapper.find(OutlinedInput);
    expect(outlinedInput.props()).toEqual({
      readOnly: props.isReadOnly,
      className:'makeStyles-codeInput-3',
      defaultValue:props.placeholder,
      id:props.inputId,
      labelWidth: 70,
    });
  });

  test('Card Copy button component should render', () => {
    const copyButton = wrapper.find(Button);
    expect(copyButton).toHaveLength(1);
  });

  test('Card Copy button component text should render', () => {
    const copyButton = wrapper.find(Button);
    expect(copyButton.children(0).text()).toContain(props.buttonText);
  });

});
