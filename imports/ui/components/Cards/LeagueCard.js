import React, { Component } from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import League from '../../../apis/riotAPI';
import { withRouter } from 'react-router';

const styles = {
  marginBottom: '25px',
  width: '75vw',
  cardWrapper: {
    display: 'flex',
    height: '200px'
  },
  cardHeader: {
    fontWeight: '300',
    width: '255px'
  },
  cardText: {
    whiteSpace: 'pre-line',
    lineHeight: '1.5'
  },
  title: {
    fontWeight: '500'
  },
  username: {
    marginLeft: '15px'
  }
};

class LeagueContainer extends Component {
  render() {
    const LeagueUserProfile = this.props.routerProps.match.params;
    if (!this.props.userLoggedin || !this.props.userLoggedin.length) {
      return <p>loading</p>;
    } else {
      let loggedInUser = this.props.userLoggedin;
      var LoggedInUserId = '';
      for (var UserId in loggedInUser) {
        if (loggedInUser[UserId]._id === LeagueUserProfile.id) {
          LoggedInUserId = loggedInUser[UserId];
        }
        console.log(this.props.userLoggedin);
      }
      let StaticChamps = JSON.parse(
        this.props.league[0].LeagueChampionsStaticList.content
      );
      let MostPlayed = this.props.userLoggedin[0].profile.league.data
        .championId;
      let MostPlayedChampName = StaticChamps.data;
      var ids = '';
      for (var champId in MostPlayedChampName) {
        if (MostPlayedChampName[champId].id == MostPlayed) {
          ids = MostPlayedChampName[champId];
        }
      }

      let leagueProfile = LoggedInUserId.profile.league;

      return (
        <div>
          <Card style={styles}>
            <div style={styles.cardWrapper}>
              <div style={styles.cardHeader}>
                <CardHeader
                  title="League of Legends"
                  subtitle="Riot Games"
                  avatar="https://ih0.redbubble.net/image.443976122.1598/flat,800x800,075,f.u1.jpg"
                  style={styles.cardHeader}
                />
                <span style={styles.username}>Username:</span>
                <CardTitle
                  title={leagueProfile.AccData.name}
                  style={styles.title}
                />
              </div>
              <CardText style={styles.cardText}>
                Most Played Champion:{'\n'}
                {ids.name}, {ids.title}
                {'\n'}
                Champion Info:{'\n'}
                Attack: {ids.info.attack} &nbsp; Defense: {ids.info.defense}{' '}
                &nbsp; Magic: {ids.info.magic} &nbsp; Difficulty:{' '}
                {ids.info.difficulty}
                {'\n'}
                Champion Mastery Level:{'\n'}
                {leagueProfile.data.championLevel}
              </CardText>
            </div>
          </Card>
        </div>
      );
    }
  }
}

const LeagueCard = withTracker(() => {
  Meteor.subscribe('league', 'users');
  return {
    league: League.find().fetch(),
    userLoggedin: Meteor.users.find().fetch()
  };
})(LeagueContainer);

export default LeagueCard;
