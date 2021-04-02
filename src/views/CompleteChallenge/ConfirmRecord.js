/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

// formik
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles(styles);

export default function ConfirmRecord({ challengeId, data, navigation }) {
    const classes = useStyles();
    const { previous, next } = navigation;
    const summary = data
    const id = challengeId
    const name = data.challengeName
    const date = data.date
    const reps = data.repetition

    console.log(data)
    console.log(name, date, reps)
    return (
        <>
            Summary of the log : {id}
            <Formik

>
                {({ submitForm, isSubmitting }) => (
                <>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <Field
                        component={TextField}
                        name="challengeName"
                        type="input"
                        label="Challenge Name"
                        disabled
                        value={name}
                        style={{ margin: '2em' }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Field
                        component={TextField}
                        name="logdate"
                        type="input"
                        label="Log Date"
                        disabled
                        value={date}
                        style={{ margin: '2em' }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <Field
                        component={TextField}
                        name="repetitions"
                        type="input"
                        label="Repetitions"
                        disabled
                        value={reps}
                        style={{ margin: '2em' }}
                        />
                    </GridItem>
                    
                    
                    
                    </GridContainer>
                </>
                )}
                </Formik>
            <Button onClick={previous}>Previous</Button>
            <Button onClick={next}>Submit</Button>
        </>
    );
}
