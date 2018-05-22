import React, { Component } from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Meteor } from 'meteor/meteor';
import { League } from '../../apis';
import { withTracker } from 'meteor/react-meteor-data';
import { FortniteCard } from '../components/Cards';
import { LeagueCard } from '../components/Cards';
import { CSGOCard } from '../components/Cards';

const styles = {
    marginBottom: '25px',
    width: '75vw',
    cardWrapper: {
        display: 'flex',
        height: '200px'
    },
    cardHeader: {
        fontWeight: '300'
    },
    cardText: {
        whiteSpace: 'pre-line'
    },
    title: {
        fontWeight: '500'
    },
    username: {
        marginLeft: '15px'
    }
};
class ProfileContainer extends Component {
    render() {
        return (
            <div>
                <Paper>
                    <p>Profile: Name</p>
                    <FortniteCard />
                    <LeagueCard />
                    <CSGOCard />
                </Paper>
            </div>
        );
    }
}

const Profile = withTracker(() => {
    Meteor.subscribe('league', 'users');
    return {
        league: League.find().fetch(),
        userLoggedin: Meteor.users.find().fetch()
    };
})(ProfileContainer);

export default Profile;
