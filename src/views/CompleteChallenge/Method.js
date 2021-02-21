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
import CustomTabs from "components/CustomTabs/CustomTabs.js";

const useStyles = makeStyles(styles);

export default function Method({ navigation }) {
    const classes = useStyles();
    const { next } = navigation;

    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <CustomTabs title="Methods:"
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Manual",
                                tabContent: (
                                    <p>man</p>

                                )
                            },
                            {
                                tabName: "Automatic",
                                tabContent: (
                                    <p>auto</p>
                                )
                            },
                        ]}
                    />
                </GridItem>
            </GridContainer>
            Method
            <Button onClick={next}>Next</Button>
        </>
    );
}
