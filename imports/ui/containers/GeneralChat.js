import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { withTracker } from 'meteor/react-meteor-data';
import Messages from '../../apis/GeneralChatAPI';
import Paper from 'material-ui/Paper';

const styles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '25px',
    paddingTop: '15px',
    fontFamily: 'Arial',
    fontSize: '30px',
    textTransform: 'capitalize',
    textAlign: 'center'
};
class GeneralChatContainer extends Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleSubmitMessage = this.handleSubmitMessage.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
  }
  handleChangeMessage(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmitMessage(e) {
    e.preventDefault();
    const submittedMessage = this.state.message;
    Meteor.call('Meteor.message.PostMessage', submittedMessage);
  }
  render() {
    return (
      <div>
        <p>Chat goes here</p>
        <form onSubmit={this.handleSubmitMessage}>
          <TextField
            onChange={this.handleChangeMessage}
            hintText="Compose Message"
            floatingLabelText="Chat with us!"
          />
        </form>
      </div>
    );
  }
=======
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
        console.log(this.state.value);
    }

    handleSubmit(event) {
        alert('A message was submitted: ' + this.state.value);
        event.preventDefault();
        const message = this.state.value;
        Meteor.call('Meteor.messages.postMessage', message);
    }
    render() {
        return (
            <div>
                <Paper>
                    <span style={styles}>GameSuite general chat</span>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            hintText="Compose Message"
                            floatingLabelText="Chat with us!"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </form>
                </Paper>
            </div>
        );
    }
>>>>>>> 7db07ab70b8b60f22844d93e2a5662c68da73e69
}

const GeneralChat = withTracker(() => {
  Meteor.subscribe('messages');
  return {
    messages: Messages.find().fetch()
  };
})(GeneralChatContainer);

export default GeneralChat;
