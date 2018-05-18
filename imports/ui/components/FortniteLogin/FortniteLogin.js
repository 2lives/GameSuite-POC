import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { Meteor } from 'meteor/meteor';
import { getFortniteData } from '../../../apis/fortniteAPI';

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
        const FortniteInput = this.state.value;

        Meteor.call('Meteor.users.InsertFortnite', FortniteInput);
        Meteor.call('Meteor.users.FetchFortniteData', FortniteInput);
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
