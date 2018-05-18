import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import AccountConfirm from '../AccountConfirm';

class LeagueLogin extends Component {
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
        event.preventDefault();
        const summonerName = this.state.value;
        Meteor.call('Meteor.users.InsertLeague', summonerName);
        Meteor.call('Meteor.users.FetchLeagueData', summonerName);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        value={this.state.value}
                        onChange={this.handleChange}
                        hintText="Summoner Name"
                        floatingLabelText="Input your Summoner Name here!"
                    />
                    <AccountConfirm />
                </form>
            </div>
        );
    }
}
export default LeagueLogin;
