/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// core components
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";

const useStyles = makeStyles(styles);

export default function ConfirmRecord({ navigation }) {
    const classes = useStyles();
    const { previous, next } = navigation;

    return (
        <>
            Summary of the log
            <Button onClick={previous}>Previous</Button>
            <Button onClick={next}>Submit</Button>
        </>
    );
}
