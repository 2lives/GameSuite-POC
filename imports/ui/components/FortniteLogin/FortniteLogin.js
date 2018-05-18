import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Meteor } from 'meteor/meteor';

const UserVal = 'calvintyvm';
class FortniteLogin extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        console.log('An Epic Games name was submitted: ' + this.state.value);
        event.preventDefault();
        Meteor.users.update(
            { id: /*this.state.value*/ UserVal },
            { $set: { 'services.fortnite.id': /*this.state.value*/ UserVal } }
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        value={this.state.value}
                        onChange={this.handleChange}
                        hintText="Epic Games Name"
                        floatingLabelText="Input your Epic Games Name"
                    />
                </form>
            </div>
        );
    }
}

export default FortniteLogin;
