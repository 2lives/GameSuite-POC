import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Meteor } from 'meteor/meteor';

const style = {
    height: 250,
    width: 800,
    margin: 20,
    //     textAlign: 'center',
    display: 'inline-block',
    fortniteCard: {}
};
// const fortnite = Meteor.fortnite.find().fetch();
class Profile extends Component {
    render() {
        return (
            <div>
                <h1>hello friends</h1>
                <Paper style={style} />
                <Paper className="fortniteCard" style={style.fortniteCard} />
                <Paper style={style} />
            </div>
        );
    }
}

export default Profile;
