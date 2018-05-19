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
class LeagueContainer extends Component {
    render() {
        if (!this.props.userLoggedin || !this.props.userLoggedin.length) {
            return <p>loading</p>;
        } else {
            let StaticChamps = JSON.parse(
                this.props.league[0].LeagueChampionsStaticList.content
            );
            console.log(StaticChamps);
            let leagueProfile = this.props.userLoggedin[0].profile.league;

            let fortniteProfile = JSON.parse(
                this.props.userLoggedin[0].profile.fortnite.data
            );
            let mostPlayed = this.props.userLoggedin[0].profile.league.data
                .championId;

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
                                {leagueProfile.data.championId}
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
