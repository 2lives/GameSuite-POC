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
        Meteor.call('Meteor.message.postMessage', submittedMessage);
    }
    render() {
        if (!this.props.messages || !this.props.messages.length) {
            return <p>loading</p>;
        } else {
            let messageObjs = this.props.messages.map(
                messages => messages.text
            );
            console.log(messageObjs);

            return (
                <div>
                    <div className="messageBox" />

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
}

const GeneralChat = withTracker(() => {
    Meteor.subscribe('messages');
    return {
        messages: Messages.find().fetch()
    };
})(GeneralChatContainer);

export default GeneralChat;
