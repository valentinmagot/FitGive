/*eslint-disable*/
import React, { useState, useEffect } from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// formik
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CoreButton from "@material-ui/core/Button";

const useStyles = makeStyles(styles);

export default function Method({repetition, challenge, navigation, onDataChange}) {
    const classes = useStyles();
    const { next } = navigation;
    const repetitionGoal = repetition
    const challengeName = challenge

   const [selectedDate, setSelectedDate] = useState(new Date());
   const [counter, setCounter] = useState(repetitionGoal)
   

   useEffect(() => {
    onDataChange({
      challengeName: challengeName,
      repetition: counter,
      date: selectedDate
    })
   }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleIncrement = () => {
    let count = counter + 1
    if (count > repetitionGoal) {
      count = repetitionGoal
    }
    setCounter(count)
    onDataChange({
      challengeName: challengeName,
      repetition: counter,
      date: selectedDate
    })
  };

  const handleDecrement = () => {
    let count = counter - 1
    if (count <= 0) {
      count = 0
    }
    setCounter(count)
    onDataChange({
      challengeName: challengeName,
      repetition: counter,
      date: selectedDate
    })
  };

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs title="Methods:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Manual",
                                tabContent: (
                                    <Formik

                                      >
                                    {({ submitForm, isSubmitting }) => (
                                      <>
                                          <GridContainer>
                                            <GridItem xs={12} sm={12} md={6}>
                                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                  disableToolbar
                                                  variant="inline"
                                                  format="MM/dd/yyyy"
                                                  margin="normal"
                                                  id="date-picker-inline"
                                                  label="Date picker inline"
                                                  value={selectedDate}
                                                  onChange={handleDateChange}
                                                  style={{ margin: '2em' }}
                                                  KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                  }}
                                                />
                                                </MuiPickersUtilsProvider>
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={6}>
                                              <Field
                                                component={TextField}
                                                name="challengeName"
                                                type="input"
                                                label="Challenge Name"
                                                disabled
                                                value={challengeName}
                                                style={{ margin: '2em' }}
                                              />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
                                            <InputLabel style={{ padding: '1em' }}>Repetitions</InputLabel>
                                            <ButtonGroup aria-label="small outlined button group">
                                              <CoreButton onClick={handleIncrement}>+</CoreButton>
                                              <CoreButton >{counter}</CoreButton>
                                              <CoreButton onClick={handleDecrement}>-</CoreButton>
                                            </ButtonGroup>
                                            </GridItem>
                                            
                                            
                                            
                                          </GridContainer>
                                      </>
                                    )}
                                  </Formik>

                                )
                            },
                            {
                                tabName: "Automatic",
                                tabContent: (
                                    <p>auto</p>
                                )
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
            Method
            <Button onClick={next}>Next</Button>
        </>
    );
}
