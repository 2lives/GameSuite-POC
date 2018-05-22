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
}

const GeneralChat = withTracker(() => {
    Meteor.subscribe('messages');
    return {
        messages: Messages.find().fetch()
    };
})(GeneralChatContainer);

export default GeneralChat;
