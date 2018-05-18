import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';

import { Meteor } from 'meteor/meteor';
import { getFortniteData } from '../../../apis/fortniteAPI';

class FortniteLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseDialog = () => {
    this.setState({ open: false });
    this.state.value = '';
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleOpenDialog = e => {
    e.preventDefault();
    this.setState({ open: true });
    this.handleSubmit();
  };

  handleSubmit(event) {
    // console.log('An Epic Games name was submitted: ' + this.state.value);
    const FortniteInput = this.state.value;

    Meteor.call('Meteor.users.InsertFortnite', FortniteInput);
    Meteor.call('Meteor.users.FetchFortniteData', FortniteInput);
  }

  render() {
    const actions = [
      <FlatButton label="Ok" primary={true} onClick={this.handleCloseDialog} />
    ];
    const inputValue = this.state.value;

    return (
      <div>
        <form onSubmit={this.handleOpenDialog}>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            hintText="Epic Games Name"
            floatingLabelText="Input your Epic Games Name"
          />
          <Dialog
            title="You have registered an Epic Games Account!"
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
export default FortniteLogin;
