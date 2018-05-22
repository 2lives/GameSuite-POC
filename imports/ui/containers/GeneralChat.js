import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { withTracker } from 'meteor/react-meteor-data';

class GeneralChatContainer extends Component {
    render() {
        return (
            <div>
                <p>Chat goes here</p>
                <TextField
                    hintText="Compose Message"
                    floatingLabelText="Chat with us!"
                />
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
