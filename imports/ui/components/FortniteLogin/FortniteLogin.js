import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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

Meteor.users.update(
  { id: this.state.value },
  { $set: { 'services.fortnite.id': this.state.value } }
);

export default FortniteLogin;
