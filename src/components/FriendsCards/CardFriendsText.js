/*eslint-disable*/
import React, {useRef, useState} from 'react';
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import Snackbar from "components/Snackbar/Snackbar.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
//export default class YourComponent extends Component {
//  constructor(props) {
//    super(props)
//
//    this.state = {
//      copySuccess: false
//    }
//  }
//
//  copyCodeToClipboard = () => {
//    const el = this.textArea
//    el.select()
//    document.execCommand("copy")
//    this.setState({copySuccess: true})
//  }
//
//  render() {
//    return (
//      <div>
//        <div>
//          <textarea
//            ref={(textarea) => this.textArea = textarea}
//            value="Example copy for the textarea."
//          />
//        </div>
//        <div>
//          <button onClick={() => this.copyCodeToClipboard()}>
//            Copy to Clipboard
//          </button>
//          {
//            this.state.copySuccess ?
//            <div style={{"color": "green"}}>
//              Success!
//            </div> : null
//          }
//        </div>
//      </div>
//    )
//  }
//}

const styles = {

  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  inputButton: {
    margin: "0px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
    height: '56px',

  },
  codeInput: {
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
    borderTopLeftRadius: "3px",
    borderBottomLeftRadius: "3px",

  },
  center:{
    display:'flex',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '27px 0px 0px 0px'
  },

};

const useStyles = makeStyles(styles);

export default function CardFriendsText(props) {

  const classes = useStyles();
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const textRef = useRef()
  
  function copyCodeToClipboard(e){
    e.preventDefault()
    try {
      setStatus('')
      setError('')
      const el = textRef.current
      el.select()
      document.execCommand("copy")
      setCopied(true)
      setStatus('Code copied!')
    }catch {
      setCopied(false)
      setError('Failed to copy')
    }
    
  }

  return (
    <div>
    <Card >
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{props.header}</h4>
        </CardHeader>
        <CardBody>
            <div className={classes.center}>
              <FormControl variant="outlined">
                <InputLabel htmlFor={props.inputId}>
                    {props.label}
                </InputLabel>
                <OutlinedInput 
                    inputRef={textRef}
                    readOnly={props.isReadOnly} 
                    className={classes.codeInput}
                    value={props.placeholder}
                    id={props.inputId}
                    labelWidth={70} /> 
                {/* {status && <Alert severity="success">{status}</Alert>}
                {error && <Alert severity="error">{error}</Alert>} */}
              </FormControl>
              <FormControl>
                <Button onClick={copyCodeToClipboard} className={classes.inputButton} color="primary">{props.buttonText} </Button>
              </FormControl>
            </div>
        </CardBody>
    </Card>
    </div>
  );
}

CardFriendsText.defaultProps = {
    header: 'header',
    label: 'label',
    placeholder: 'placeholder',
    buttonText: 'button',
    isReadOnly: false,
    inputId: 'outlined-code',
}