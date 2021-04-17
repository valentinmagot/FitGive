/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Formik, Field } from "formik";
import { TextField, Select, CheckboxWithLabel } from "formik-material-ui";
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

const useStyles = makeStyles(styles);

export default function NewChallenge() {
  const classes = useStyles();
  const { currentUser, currentUserInfo } = useAuth()
  const history = useHistory()

  const [showPayment, setShowPayment] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [currentUserFriends, setCurrentUserFriends] = useState([])
  const uid = currentUser ? currentUser.uid : ''
  const code = currentUserInfo ? currentUserInfo.code : ''

  const [selectedStartDate, setStartDate] = useState(new Date());
  const [selectedEndDate, setEndDate] = useState(new Date(Date.now() + 12096e5));
  const today = new Date();

  const togglePayment = () => {
    setShowPayment(!showPayment)
  }

  /**
   * Gets all the friends of the logged in user in the system.
   *
   * @param {string} uid The user identifier.
   */
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

  /**
   * Gets all the friends of the logged in user in the system.
   * 
   * @returns {Map}  user friend list without duplicates.
   */
  const filteredFriends = () => {
    return currentUserFriends.filter((arr, index, self) =>
      index === self.findIndex((t) => (t.code === arr.code && t.code !== code)))
  };

  /**
   * Manages the start of challenge date.
   * 
   * @param {Object} event The event triggered.
   * @param {date} newValue The new date to save.
   */
  const handleStartDateChange = (event, newValue) => {
    setStartDate(newValue);
  };

  /**
   * Manages the end of challenge date.
   * 
   * @param {Object} event The event triggered.
   * @param {date} newValue The new date to save.
   */
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
        <GridItem xs={12} sm={12} md={8} style={{ margin: "auto" }}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Create a new challenge!</h4>
              <p className={classes.cardCategoryWhite}>Hit your daily goals with a friend.</p>
            </CardHeader>
            <Formik
            /**
             * initialize the initial value of the form.
             * 
             */
              initialValues={{
                challengeName: '',
                friend: '',
                description: '',
                exercise: 'Jumping Jacks',
                repetitionGoal: '',
                addPayment: false,
                moneyAmount: '',
              }}
              
              /**
               * Verifies that all required values are captured.
               * 
               * @param {string} values The values of each fields.
               */
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
                if (values.repetitionGoal < 1) {
                  errors.repetitionGoal = "Minimum 1";
                }
                if (values.moneyAmount < 0) {
                  errors.moneyAmount = "Cannot be negative";
                }

                return errors;
              }}
              
              /**
               * Writes the new challenge information to the database.
               * 
               * @param {string} values The values of each fields.
               */
              onSubmit={(values, { setSubmitting }) => {
                let { challengeName, friend, description, exercise, repetitionGoal, moneyAmount, addPayment } = values;


                if (!showPayment) {
                  moneyAmount = 0;
                }


                db.collection("CHALLENGES")
                  .doc()
                  .set({
                    owner: code,
                    startDate: new Date(selectedStartDate),
                    endDate: new Date(selectedEndDate),
                    challengeName: challengeName,
                    participants: [code, friend],
                    description: description,
                    exercise: exercise,
                    repetitionGoal: repetitionGoal,
                    moneyAmount: moneyAmount,
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
                        <div style={{ margin: "auto", width: "48%" }}>
                          <InputLabel>Friends</InputLabel>
                          <Field
                            variant="outlined"
                            component={Select}
                            name="friend"
                            style={{ minWidth: '10em', width: "100%" }}
                            defaultValue=""
                          >
                            {filteredFriends().map((item, index) =>
                              <MenuItem defaultValue="" key={index ? index : ''} value={item ? item.code : ''}>{item ? item.firstname + ' ' + item.lastname : ''}</MenuItem>
                            )}
                          </Field>
                        </div>
                        <div style={{ margin: "auto", width: "48%" }}>
                          <InputLabel>Exercise</InputLabel>
                          <Field
                            component={Select}
                            name="exercise"
                            variant="outlined"
                            style={{ minWidth: '10em', width: "100%" }}
                          >
                            <MenuItem value={"Jumping Jacks"}>Jumping Jacks</MenuItem>
                            <MenuItem value={"Pushup"}>Pushup</MenuItem>
                            <MenuItem value={"Situps"}>Situps</MenuItem>
                            <MenuItem value={"Pullups"}>Pullups</MenuItem>
                          </Field>
                        </div>
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
                      <Field
                        className={classes.element}
                        component={TextField}
                        name="repetitionGoal"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Repetitions per Day"
                        variant="outlined"
                      />
                      <Field
                        style={{ margin: "1em 1.5em" }}
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
                            <Field
                              component={TextField}
                              label="Amount of Money to Stake ($CAD)"
                              variant="outlined"
                              type="number"
                              name="moneyAmount"
                              InputProps={{ inputProps: { min: 0 } }}
                              style={{ width: "100%" }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12} style={{ display: "flex", justifyContent: "center" }}>
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
