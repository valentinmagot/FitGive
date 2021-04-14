import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// formik
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Automatic from "./Automatic.js";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import CoreButton from "@material-ui/core/Button";

export default function Method({ repetition, challenge, navigation, onDataChange }) {
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
    let count = counter + 1;
    if (count > repetitionGoal) {
      count = repetitionGoal
    }
    setCounter(count)
    onDataChange({
      challengeName: challengeName,
      repetition: count,
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
      repetition: count,
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
                  <Formik>
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
                                readOnly= {true}
                                id="date-picker-inline"
                                label="Log Date"                              
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
                              InputProps={{
                                readOnly: true,
                              }}                                       
                              value={challengeName}
                              style={{ margin: '2em' }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
                            <InputLabel style={{ padding: '1em' }}>Reps Completed</InputLabel>
                            <ButtonGroup aria-label="small outlined button group">
                              <CoreButton onClick={handleDecrement}>-</CoreButton>
                              <CoreButton >{counter}</CoreButton>
                              <CoreButton onClick={handleIncrement}>+</CoreButton>
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
                  <Automatic 
                    onDataChange={onDataChange}
                    challengeName={challengeName}
                    repetition={repetitionGoal}
                    date={selectedDate}

                  />
                )
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <Button color="primary" style={{ display: "flex", marginLeft: "auto" }} onClick={next}>Next</Button>
    </>
  );
}
