/*eslint-disable*/
import React from "react";
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
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";

const steps = [
    { id: "method" },
    { id: "confirmRecord" },
    { id: "recordingComplete" },
];

const useStyles = makeStyles(styles);

const CompleteChallenge = ({ open, onClose }) => {
    const classes = useStyles();
    const [formData, setForm] = useForm();
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, navigation };

    const renderSwitch = (id) => {
        switch (id) {
            case "method":
                return <Method {...props} />;
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
            <Dialog open={open} onClose={onClose} disableBackdropClick={true}>
                <DialogContent>
                    {renderSwitch(id)}
                    <Button onClick={onClose}>kms</Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
export default CompleteChallenge;
