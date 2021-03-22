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
import { TextField, Select, CheckboxWithLabel } from "formik-material-ui";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

const useStyles = makeStyles(styles);

export default function Method({ navigation }) {
    const classes = useStyles();
    const { next } = navigation;
    const challenge = 'Challenge name'
    const challengeDescription = 'Hardcoded challenge'
    const friendName = 'Hardcoded name'
    const exerciceName = 'Hardcoded Exercice'
    const repetition = 30

    const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
                      
                                    validate={(values) => {
                                      const errors = {};
                      
                                      if (!values.repetitionGoal) {
                                        errors.repetitionGoal = "Required";
                                      }
                      
                                      return errors;
                                    }}
                      
                                    onSubmit={(values, { setSubmitting }) => {
                                      const { challengeName, friend, description, exercise, length, repetitionGoal, moneyAmount } = values;
                      
                                      db.collection("challenges")
                                        .doc()
                                        .set({
                                          challengeName: challengeName,
                                          friend: friend,
                                          description: description,
                                          exercise: exercise,
                                          length: length,
                                          repetitionGoal: repetitionGoal,
                                          moneyAmount: moneyAmount,
                                        })
                                        .then(() => {
                                          history.push("/app/challenges")
                                        })
                                        .catch((error) => {
                                          setSubmitting(false);
                                          console.error(error);
                                        });
                                    }}
                      
                                  >
                                    {({ submitForm, isSubmitting }) => (
                                      <>
                                          <GridContainer>
                                          {/* <GridItem xs={12} sm={12} md={5}>
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
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            />
                                            </MuiPickersUtilsProvider>
                                          </GridItem> */}
                                            <GridItem xs={12} sm={12} md={5}>
                                              <Field
                                                component={TextField}
                                                name="challengeName"
                                                type="input"
                                                label="Challenge Name"
                                                value={challenge}
                                                style={{ margin: '2em' }}
                                              />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                              <Field
                                                component={TextField}
                                                name="friend"
                                                type="input"
                                                label="Friend"
                                                value={friendName}
                                                style={{ margin: '2em' }}
                                              />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                              <Field
                                                component={TextField}
                                                name="description"
                                                type="input"
                                                label="Challenge Description"
                                                value={challengeDescription}
                                                style={{ margin: '2em' }}
                                              />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                              <Field
                                                component={TextField}
                                                name="exercise"
                                                type="input"
                                                label="Exercice"
                                                value={exerciceName}
                                                style={{ margin: '2em' }}
                                              />
                                            </GridItem>
                                            <GridItem xs={12} sm={12} md={5}>
                                              <Field
                                                component={TextField}
                                                name="repetition"
                                                type="input"
                                                label="Reps"
                                                defaultValue={repetition}
                                                style={{ margin: '2em' }}
                                              />
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
