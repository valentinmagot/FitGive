import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import TextField from '@material-ui/core/TextField';


export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

     /**
     * Manages input focus
     *
     * @param {Object} e The event triggered.
     */
    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    /**
     * Manages input change
     *
     * @param {Object} e The event triggered.
     */
    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="PaymentForm" style={{ display: "flex" }}>
                <div style={{ margin: 'auto' }}>
                    <Cards
                        cvc={this.state.cvc}
                        expiry={this.state.expiry}
                        focused={this.state.focus}
                        name={this.state.name}
                        number={this.state.number}
                    />
                </div>
                <form style={{ width: '15em', margin: "3em" }}>
                    <TextField
                        type="tel"
                        name="number"
                        label="Card Number"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        name="expiry"
                        label="Valid Through"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{ margin: '0.4em' }}
                    />
                    <TextField
                        name="cvc"
                        label="CVC"
                        variant="outlined"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{ margin: '0.4em' }}
                    />
                </form>
            </div>
        );
    }
}