/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

// formik
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";

//db
import { db } from '../../firebase'
import { useAuth } from "context/authContext.js"

const useStyles = makeStyles(styles);

export default function ConfirmRecord({ challengeId, data, navigation }) {
    const { currentUserInfo } = useAuth()
    const { previous, next } = navigation;
    const summary = data
    const id = challengeId
    const code = currentUserInfo ? currentUserInfo.code : ''
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

                /**
                 * Writes the logs data in the database
                 * 
                 * @param {string} values Different fields of the form
                 */
                onSubmit={(values, { setSubmitting }) => {
                    const { challengeName, logdate, repetitions } = values;
                    const day = code + '-' + logdate.getFullYear() + '-' + (logdate.getMonth() + 1) + '-' + logdate.getDate();
                    db.collection("CHALLENGES")
                        .doc(id)
                        .collection("LOGS")
                        .doc(day)
                        .set({
                            name: challengeName,
                            repetitions: repetitions,
                            user: code

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
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ margin: '2em' }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <Field
                                    component={TextField}
                                    name="logdate"
                                    type="input"
                                    label="Log Date"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    style={{ margin: '2em' }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <Field
                                    component={TextField}
                                    name="repetitions"
                                    type="input"
                                    label="Reps Completed"
                                    style={{ margin: '2em' }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                        <div style={{ textAlign: "right" }}>
                            <Button color="warning" style={{ display: "inlineBlock" }} onClick={previous}>Previous</Button>
                            <Button color="primary" style={{ display: "inlineBlock" }} onClick={submitForm}>Submit</Button>
                        </div>
                    </>
                )}
            </Formik>
        </>
    );
}
