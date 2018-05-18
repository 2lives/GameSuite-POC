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
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
    const summonerName = this.state.value;
    // Meteor.call('Meteor.users.InsertLeague', summonerName);
    Meteor.call('Meteor.users.FetchLeagueData', summonerName);
  }

  render() {
    const actions = [
      <FlatButton label="Ok" primary={true} onClick={this.handleCloseDialog} />
    ];
    const test = 'this';

    return (
      <div>
        <form onSubmit={this.handleOpenDialog}>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            hintText="Summoner Name"
            floatingLabelText="Input your Summoner Name here!"
          />
          <Dialog
            title="You have registered an account!"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <div>
              <p>Confirm that your name is: {test}</p>
            </div>
          </Dialog>
        </form>
      </div>
    );
  }
}
export default LeagueLogin;
