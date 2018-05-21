import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitName = this.handleSubmitName.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmitName(e) {
    e.preventDefault();
    const gameSuiteID = this.state.value;
    Meteor.call('Meteor.users.CreateGameSuiteID', gameSuiteID);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitName}>
        <TextField
          value={this.state.value}
          onChange={this.handleChange}
          hintText="GameSuiteID"
        />
      </form>
    );
  }
}
export default LoginID;
