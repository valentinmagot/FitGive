/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

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
  const dummyData = [
    {
      id: 0,
      challengeName: 'Exercising with my Pals',
      quickStats: 'Completed 25 sit-ups a day for 10 days.'
    }, {
      id: 1,
      challengeName: 'My First Challenge!',
      quickStats: 'Completed 5 push-ups a day for 30 days.'
    },
  ];
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Start a Challenge</h4>
              <p className={classes.cardCategoryWhite}>Hit your daily goals together.</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Challenge Name"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Challenge Friend"
                    formControlProps={{
                      fullWidth: true,
                      required: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Challenge Description"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 3
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                    // value={age}
                    // onChange={handleChange}
                    >
                      <MenuItem value={"Pushup"}>Pushup</MenuItem>
                      <MenuItem value={"Situps"}>Situps</MenuItem>
                      <MenuItem value={"Pullups"}>Pullups</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={5} style={{margin: "3em"}}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Challenge Length</InputLabel>
                  <Slider
                    defaultValue={2}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    marks={marks}
                    valueLabelDisplay="auto"
                    min={1}
                    max={6}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5} style={{margin: "3em 1em"}}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Repetitions per Day</InputLabel>
                  <Slider
                    defaultValue={50}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    valueLabelDisplay="on"
                    min={1}
                    max={200}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5} style={{margin: "3em 1em"}}>
                  <InputLabel style={{ color: "#AAAAAA" }}>Amount of Money</InputLabel>
                  <Slider
                    defaultValue={25}
                    getAriaValueText={moneyvaluetext}
                    aria-labelledby="discrete-slider-always"
                    step={1}
                    marks={moneyMarks}
                    valueLabelDisplay="auto"
                    min={1}
                    max={100}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Link id='newChallenge' to='/app/challenges' >
                <Button color="primary" submit>Challenge!</Button>
              </Link>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div >
  );
}
