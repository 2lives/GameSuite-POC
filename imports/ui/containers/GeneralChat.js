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

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop =
      maxScrollTop > 0 ? maxScrollTop : 0;
  };
  render() {
    let messageObjs = this.props.messages.map(messages => (
      <li
        style={{
          margin: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '30vw',
          padding: '5px'
        }}
      >
        <p>{Meteor.users.findOne(messages[0].poster).profile.gamesuite.id}:</p>
        <p>{messages[1].text}</p>
      </li>
    ));

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          margin: 'auto'
        }}
      >
        <Paper
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: 'auto',
            padding: '20px',
            minWidth: '200px'
          }}
        >
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'scroll',
              maxHeight: '200px',
              justifyContent: 'center',
              margin: 'auto'
            }}
          >
            <h2> Welcome to the General Chat! </h2>
            {messageObjs}
          </ul>
        </Paper>

        <form onSubmit={this.handleSubmitMessage} style={{ margin: 'auto' }}>
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
