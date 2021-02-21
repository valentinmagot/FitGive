import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="PaymentForm" style={{display:"flex"}}>
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form>
                    <input
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{margin:'1em'}}
                    />
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{margin:'1em'}}
                    />
                    <input
                        name="expiry"
                        placeholder="Valid Through"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{margin:'1em'}}
                    />
                    <input
                        name="cvc"
                        placeholder="CVC"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        style={{margin:'1em'}}
                    />
                </form>
            </div>
        );
    }
}