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

import { Link } from 'react-router-dom';

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
    if (!this.props.userLoggedin || !this.props.userLoggedin.length) {
      return <p>loading</p>;
    } else {
      const UserData = this.props.userLoggedin[0].profile.gamesuite;

      return (
        <div
          style={{
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              margin: '0 auto',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '75vw',
                height: '100px',
                justifyContent: 'space-between',
                margin: '10px 0',
                fontSize: '30px'
              }}
            >
              {UserData.id}
              <Paper
                style={{
                  height: '100px',
                  minWidth: '25vw',
                  fontSize: '1rem',
                  padding: '10px'
                }}
              >
                {UserData.bio}
              </Paper>
            </div>

            <FortniteCard routerProps={this.props} />
            <LeagueCard routerProps={this.props} />
            <CSGOCard routerProps={this.props} />
          </div>
        </div>
      );
    }
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
