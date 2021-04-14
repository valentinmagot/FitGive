/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

const useStyles = makeStyles(styles);

export default function RecordingComplete({ navigation }) {
    const classes = useStyles();
    const { previous } = navigation;

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{margin: "2em"}}>
                    <h4>Today's log has been saved successfully.</h4>
                </GridItem>
            </GridContainer>
            <Button color="primary" onClick={previous}>Edit Submission</Button>
        </>
    );
}
