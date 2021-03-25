/*eslint-disable*/
import React, { useState, useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Field } from "formik";
import { TextField, Select, CheckboxWithLabel } from "formik-material-ui";
import { useHistory } from "react-router-dom";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Payment from "./Payment.js"

import {db} from '../../firebase'
import {useAuth} from "../../context/authContext"

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
}

const marks = [
  {
    value: 1,
    label: '1 week',
  },
  {
    value: 2,
    label: '2 weeks',
  },
  {
    value: 4,
    label: '4 weeks',
  },
  {
    value: 6,
    label: '6 weeks',
  },
];

const moneyMarks = [
  {
    value: 0,
    label: '$0',
  },
  {
    value: 25,
    label: '$25',
  },
  {
    value: 50,
    label: '$50',
  },
  {
    value: 75,
    label: '$75',
  },
  {
    value: 100,
    label: '$100',
  },
];

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

  const [repValue, setRepValue] = useState(15)
  const [moneyValue, setMoneyValue] = useState(0) 
  const [lengthValue, setLengthValue] = useState(14) 

  const togglePayment = () => {
    setShowPayment(!showPayment)
    setMoneyValue(0)
  }

  function fetchUserFrienList(uid) {
    if(uid)
      db.collection("USERS").doc(uid).collection('FRIENDS')
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach((doc) => {
              setCurrentUserFriends(friend => [...friend, doc.data()])
          })
      })
      .catch(function(error) {
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

  const handleLengthChange = (event, newValue) => {
    let days;
    switch (newValue) {
      case 1:
        days = 7;
        break;
      case 2:
        days = 14;
        break;
      case 3:
        days = 21;
        break;
      case 4:
        days = 28;
        break;
      case 5:
        days = 35;
        break;
      case 6:
        days = 42;
        break;
      default:
        break;
    }
    setLengthValue(days);
  };

  useEffect(() => {
    setLoading(true)
    fetchUserFrienList(uid)
    setLoading(false)
  }, [])

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Start a Challenge</h4>
              <p className={classes.cardCategoryWhite}>Hit your daily goals with a friend.</p>
            </CardHeader>
            <Formik
              initialValues={{
                challengeName: '',
                friend: '',
                description: '',
                exercise: 'Pushup',
                length: '',
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
                const { challengeName, friend, description, exercise, length, repetitionGoal, moneyAmount } = values;

                const startDate = new Date()
                const endDate = new Date()
                endDate.setDate(startDate.getDate() + lengthValue)
        
                db.collection("CHALLENGES")
                  .doc()
                  .set({
                    owner: code,
                    startDate: startDate,
                    endDate: endDate,
                    challengeName: challengeName,
                    friend: friend,
                    description: description,
                    exercise: exercise,
                    length: lengthValue,
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
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <Field
                          component={TextField}
                          name="challengeName"
                          type="input"
                          label="Challenge Name"
                          style={{ margin: '2em' }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5} style={{ margin: '2em' }}>
                      <InputLabel>Friends</InputLabel>
                      <Field
                          component={Select}
                          name="friend"
                          style={{ minWidth: '10em' }}
                          defaultValue = "" 
                        >
                          {filteredFriends().map((item, index) =>
                                <MenuItem  defaultValue="" key={index ? index : ''} value={item ? item.code : ''}>{item ? item.firstname + ' ' + item.lastname : ''}</MenuItem>
                            )}
                        </Field>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <Field
                          component={TextField}
                          name="description"
                          type="input"
                          label="Challenge Description"
                          style={{ margin: '2em' }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5} style={{ margin: '2em' }}>
                        <InputLabel>Exercise</InputLabel>
                        <Field
                          component={Select}
                          name="exercise"
                          style={{ minWidth: '10em' }}
                        >
                          <MenuItem value={"Pushup"}>Pushup</MenuItem>
                          <MenuItem value={"Situps"}>Situps</MenuItem>
                          <MenuItem selected value={"Pullups"}>Pullups</MenuItem>
                        </Field>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <InputLabel>Length</InputLabel>
                        <Field
                          component={Slider}
                          name="length"
                          defaultValue={2}
                          step={1}
                          marks={marks}
                          valueLabelDisplay="auto"
                          onChange={handleLengthChange}
                          min={1}
                          max={6}
                          style={{ margin: '2em' }}
                        >
                        </Field>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <InputLabel>Repetitions per Day</InputLabel>
                        <Field
                          component={Slider}
                          name="repetitionGoal"
                          defaultValue={15}
                          value={repValue}
                          aria-labelledby="discrete-slider-always"
                          onChange={handleRepChange}
                          step={1}
                          valueLabelDisplay="on"
                          min={1}
                          max={200}
                          style={{ margin: '2em' }}
                        >
                        </Field>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          name="checked"
                          checked={showPayment}
                          onChange={togglePayment}
                          Label={{ label: 'I would like to stake money in the challenge' }}
                          style={{ margin: '2em' }}
                        >
                        </Field>
                      </GridItem>
                      {showPayment &&
                        <>
                          <GridItem xs={12} sm={12} md={7} style={{ margin: "1em auto" }}>
                            <InputLabel>Amount of Money to Stake ($CAD)</InputLabel>
                            <Field
                              component={Slider}
                              defaultValue={0}
                              value={moneyValue}
                              step={1}
                              onChange={handleMoneyChange}
                              marks={moneyMarks}
                              valueLabelDisplay='on'
                              min={1}
                              max={100}
                              style={{ margin: '2em' }}
                            >
                            </Field>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={7} style={{ margin: "auto" }}>
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
