import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit() {
    const gameSuiteID = this.state.value;
    Meteor.call('Meteor.users.CreateGameSuiteID', gameSuiteID);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            value={this.state.value}
            onChange={this.handleChange}
            hintText="Select your Screen Name"
            floatingLabelText="Create your GameSuite ID"
          />
        </form>
      </div>
    );
  }
}
export default Login;
