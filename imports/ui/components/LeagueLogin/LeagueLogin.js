import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import AccountConfirm from '../AccountConfirm';

class LeagueLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpenDialog = e => {
        e.preventDefault();
        this.setState({ open: true });
        this.handleSubmit();
    };

    handleCloseDialog = () => {
        this.setState({ open: false });
        this.state.value = '';
    };

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit() {
        const summonerName = this.state.value;
        Meteor.call('Meteor.users.FetchLeagueData', summonerName);
        //    Meteor.call('Meteor.league.GetChampionList');
    }

    render() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onClick={this.handleCloseDialog}
            />
        ];
        const inputValue = this.state.value;

        return (
            <div>
                <form onSubmit={this.handleOpenDialog}>
                    <TextField
                        value={this.state.value}
                        onChange={this.handleChange}
                        hintText="Summoner Name"
                        floatingLabelText="Input your Summoner Name"
                    />
                    <Dialog
                        title="You have registered a League of Legends Account!"
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                    >
                        <div>
                            <p>The name you submitted was: {inputValue}</p>
                        </div>
                    </Dialog>
                </form>
            </div>
        );
    }
}
export default LeagueLogin;
