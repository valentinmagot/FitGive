/*eslint-disable*/
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogContent
} from "@material-ui/core";
import { useForm, useStep } from "react-hooks-helper";

import Method from "./Method";
import ConfirmRecord from "./ConfirmRecord";
import RecordingComplete from "./RecordingComplete";

// core components
import IconButton from '@material-ui/core/IconButton';
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import CloseIcon from '@material-ui/icons/Close';

const steps = [
    { id: "method" },
    { id: "confirmRecord" },
    { id: "recordingComplete" },
];

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        margin:"1em",
    }
}));

const CompleteChallenge = ({ open, onClose, challenge, repetition, challengeId }) => {
    const classes = useStyles();
    const [formData, setForm] = useForm();
    const [data, setData] = useState();
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, data, setData, navigation, challenge, repetition, challengeId };

    const handleFormData = (data) => {
        setData(data)
    }

    const renderSwitch = (id) => {
        switch (id) {
            case "method":
                return <Method onDataChange={handleFormData} {...props} />;
            case "confirmRecord":
                return <ConfirmRecord {...props} />;
            case "recordingComplete":
                return <RecordingComplete {...props} />;
            default:
                return <Method {...props} />;
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} disableBackdropClick={true} maxWidth={false}>
                <DialogContent className={classes.dialog}>
                    {renderSwitch(id)}
                    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default CompleteChallenge;
