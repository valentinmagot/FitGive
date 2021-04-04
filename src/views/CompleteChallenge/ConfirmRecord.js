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

//db
import {db} from '../../firebase'

const useStyles = makeStyles(styles);

export default function ConfirmRecord({ challengeId, data, navigation }) {
    const classes = useStyles();
    const { previous, next } = navigation;
    const summary = data
    const id = challengeId
    const name = data.challengeName
    const date = data.date
    const reps = data.repetition
    

    return (
        <>
            Summary of the log :
            <Formik
                        initialValues={{
                            challengeName: name,
                            logdate: date,
                            repetitions: reps,

                          }}

                        onSubmit={(values, { setSubmitting }) => {
                            const { challengeName, logdate, repetitions} = values;
                            console.log(logdate.toString())
                            const day = logdate.getFullYear()+'-'+(logdate.getMonth()+1)+'-'+logdate.getDate();
                            console.log(id)
                            db.collection("CHALLENGES")
                            .doc(id)
                            .collection("LOGS")
                            .doc(day)
                            .set({
                                name:challengeName,
                                repetitions: repetitions
                                
                            })
                            .then(() => {
                                next()
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
                    <GridItem xs={12} sm={12} md={6}>
                        <Field
                        component={TextField}
                        name="challengeName"
                        type="input"
                        label="Challenge Name"
                        disabled
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
                        style={{ margin: '2em' }}
                        />
                    </GridItem>
                    
                    
                    
                    </GridContainer>
                    <Button color="warning" onClick={previous}>Previous</Button>
                    <Button color="primary" onClick={submitForm}>Submit</Button>
                </>
                
                )}
                
                </Formik>
            
        </>
    );
}
