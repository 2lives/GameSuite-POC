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
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
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
    Meteor.call('Meteor.messages.postMessage', submittedMessage);
    this.state.message = '';
  }
  render() {
    let messageObjs = this.props.messages.map(messages => (
      <li>{messages.text}</li>
    ));

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {messageObjs}
        </ul>

        <form onSubmit={this.handleSubmitMessage}>
          <TextField
            value={this.state.message}
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
