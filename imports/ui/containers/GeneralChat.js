import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { withTracker } from 'meteor/react-meteor-data';

class GeneralChatContainer extends Component {
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
}

const GeneralChat = withTracker(() => {
  Meteor.subscribe('messages');
  return {
    messages: Messages.find().fetch()
  };
})(GeneralChatContainer);

export default GeneralChat;
