/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import { default as NumberField } from '@material-ui/core/TextField';

import { Formik, Field } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { useHistory } from "react-router-dom";
import DateFnsUtils from '@date-io/date-fns';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Payment from "./Payment.js"

import { db } from '../../firebase'
import { useAuth } from "../../context/authContext"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    margin: "2em 1em",
    minWidth: "100%",
  },
  element: {
    margin: "1em 2em",
    width: "100%",
  },
}

function moneyvaluetext(value) {
  return `${value} $`;
}

const useStyles = makeStyles(styles);

export default function NewChallenge() {
  const classes = useStyles();
  const { currentUser, currentUserInfo } = useAuth()
  const history = useHistory()

  const [showPayment, setShowPayment] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [currentUserFriends, setCurrentUserFriends] = useState([])
  const [friend, setFriend] = useState()
  const uid = currentUser ? currentUser.uid : ''
  const code = currentUserInfo ? currentUserInfo.code : ''

  const [repValue, setRepValue] = useState(15);
  const [moneyValue, setMoneyValue] = useState(0);
  const [selectedStartDate, setStartDate] = useState(new Date());
  const [selectedEndDate, setEndDate] = useState(new Date(Date.now() + 12096e5));
  const today = new Date();

  const togglePayment = () => {
    setShowPayment(!showPayment)
    setMoneyValue(0)
  }

  function fetchUserFrienList(uid) {
    if (uid)
      db.collection("USERS").doc(uid).collection('FRIENDS')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            setCurrentUserFriends(friend => [...friend, doc.data()])
          })
        })
        .catch(function (error) {
          console.log("Error getting friends: ", error);
        });

  }

  const filteredFriends = () => {
    return currentUserFriends.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.code === arr.code && t.code !== code)))
  };

  const handleRepChange = (event, newValue) => {
    setRepValue(newValue);
  };

  const handleMoneyChange = (event, newValue) => {
    setMoneyValue(newValue);
  };

  const handleStartDateChange = (event, newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (event, newValue) => {
    setEndDate(newValue);
  };

  useEffect(() => {
    setLoading(true)
    fetchUserFrienList(uid)
    setLoading(false)
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6} style={{ margin: "auto" }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create a new challenge!</h4>
              <p className={classes.cardCategoryWhite}>Hit your daily goals with a friend.</p>
            </CardHeader>
            <Formik
              initialValues={{
                challengeName: '',
                friend: '',
                description: '',
                exercise: 'Pushup',
                repetitionGoal: '',
                addPayment: false,
                moneyAmount: '',
              }}

              validate={(values) => {
                const errors = {};

                if (!values.challengeName) {
                  errors.challengeName = "Required";
                }
                if (!values.friend) {
                  errors.friend = "Required";
                }
                if (!values.exercise) {
                  errors.exercise = "Required";
                }

                return errors;
              }}

              onSubmit={(values, { setSubmitting }) => {
                const { challengeName, friend, description, exercise } = values;
                console.log(selectedStartDate);
                db.collection("CHALLENGES")
                  .doc()
                  .set({
                    owner: code,
                    startDate: selectedStartDate,
                    endDate: selectedEndDate,
                    challengeName: challengeName,
                    participants: [code, friend],
                    description: description,
                    exercise: exercise,
                    repetitionGoal: repValue,
                    moneyAmount: moneyValue,
                    isComplete: false,
                    winner: ''
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
                  <CardBody style={{ padding: "3em 5em" }}>
                    <GridContainer>
                      <Field
                        className={classes.element}
                        component={TextField}
                        name="challengeName"
                        type="input"
                        label="Challenge Name *"
                        variant="outlined"
                      />
                      <Field
                        className={classes.element}
                        component={TextField}
                        rows={2}
                        multiline
                        name="description"
                        type="input"
                        label="Challenge Description"
                        variant="outlined"
                      />
                      <div className={classes.element} style={{ display: "flex", justifyContent: "center" }}>
                        <FormControl variant="outlined" style={{ margin: "auto", width: "48%" }}>
                          <InputLabel style={{ backgroundColor: "white" }} id="friends-label">Your Friend *</InputLabel>
                          <Select
                            key="Confirmation Code"
                            labelId="friends-label"
                            component={Select}
                            name="friend"
                            style={{ minWidth: '10em' }}
                            defaultValue=""
                          >
                            {filteredFriends().map((item, index) =>
                              <MenuItem defaultValue="" key={index ? index : ''} value={item ? item.code : ''}>{item ? item.firstname + ' ' + item.lastname : ''}</MenuItem>
                            )}
                          </Select>
                        </FormControl>

                        <FormControl variant="outlined" style={{ margin: "auto", width: "48%" }}>
                          <InputLabel style={{ backgroundColor: "white" }} id="exercise-label">Exercise *</InputLabel>
                          <Select
                            labelId="exercise-label"
                            name="exercise"
                            style={{ minWidth: '10em' }}
                          >
                            <MenuItem value={"Pushup"}>Pushup</MenuItem>
                            <MenuItem value={"Situps"}>Situps</MenuItem>
                            <MenuItem selected value={"Pullups"}>Pullups</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className={classes.element} style={{ display: "flex", justifyContent: "center" }}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            style={{ margin: "auto", width: "48%" }}
                            name="startDate"
                            minDate={today}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Start Date *"
                            value={selectedStartDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            inputVariant="outlined"
                          />
                          <KeyboardDatePicker
                            style={{ margin: "auto", width: "48%" }}
                            name="endDate"
                            minDate={today}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="End Date *"
                            value={selectedEndDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            inputVariant="outlined"
                          />
                        </MuiPickersUtilsProvider>
                      </div>

                      <NumberField
                        className={classes.element}
                        name="repetitionGoal"
                        id="filled-number"
                        label="Repetitions per Day *"
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={handleRepChange}
                        value={repValue}
                        defaultValue={25}
                        variant="outlined"
                      />

                      <Field
                        style={{ margin: "1em 0.5em 0 1.5em" }}
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="checked"
                        color="primary"
                        checked={showPayment}
                        onChange={togglePayment}
                        Label={{ label: 'I would like to stake money in the challenge' }}
                      >
                      </Field>
                      {showPayment &&
                        <>
                          <GridItem xs={12} sm={12} md={12} style={{ margin: "1em auto" }}>
                            <h3>Payment</h3>
                            <NumberField
                              className={classes.element}
                              label="Amount of Money ($CAD)"
                              type="number"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleMoneyChange}
                              value={moneyValue}
                              defaultValue={25}
                              variant="outlined"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12} style={{ margin: "auto" }}>
                            <Payment />
                          </GridItem>
                        </>
                      }
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary" disabled={isSubmitting}
                      onClick={submitForm}>Challenge!</Button>
                  </CardFooter>
                </>
              )}
            </Formik>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}
