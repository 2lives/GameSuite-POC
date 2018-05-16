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
import { League } from '../../apis';
import { Fortnite } from '../../apis';
import { withTracker } from 'meteor/react-meteor-data';

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

// const fortnite = Meteor.fortnite.find().fetch();
// console.log(this.props);
class ProfileContainer extends Component {
    render() {
        console.log(this.props);

        if (!this.props.fortnite || !this.props.fortnite.length) {
            return <p>loading</p>;
        } else {
            let fortniteProfile = JSON.parse(this.props.fortnite[0].profile);
            return (
                <div>
                    <Card style={styles}>
                        <div style={styles.cardWrapper}>
                            <div style={styles.cardHeader}>
                                <CardHeader
                                    title="Fortnite"
                                    subtitle="Epic Games"
                                    avatar="https://res.cloudinary.com/teepublic/image/private/s--8LWtGSfC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1522032181/production/designs/2529444_0.jpg"
                                    style={styles.cardHeader}
                                />
                                <span style={styles.username}>Username:</span>
                                <CardTitle
                                    title={fortniteProfile.epicUserHandle}
                                    style={styles.title}
                                />
                            </div>

                            <CardText style={styles.cardText}>
                                Win Ratio %:{'\n'}
                                {fortniteProfile.stats.p2.winRatio.value}
                                {'\n'}
                                Total Kills:{'\n'}
                                {fortniteProfile.stats.p2.kills.value}
                                {'\n'}
                                Kill/ Death Ratio: {'\n'}
                                {fortniteProfile.stats.p2.kd.value}
                                {'\n'}
                                Score per Match: {'\n'}
                                {fortniteProfile.stats.p2.scorePerMatch.value}
                                {'\n'}
                                Matches Played in Current Season: {'\n'}
                                {fortniteProfile.stats.p2.matches.value}
                            </CardText>
                        </div>
                    </Card>
                    {/* split */}
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
                                    title={this.props.fortnite[0].user}
                                    style={styles.title}
                                />
                            </div>

                            <CardText style={styles.cardText}>
                                Calvin is bad at League of Legends
                            </CardText>
                        </div>
                    </Card>
                </div>
            );
        }
    }
}

const Profile = withTracker(() => {
    Meteor.subscribe('fortnite', 'league');
    return {
        fortnite: Fortnite.find().fetch(),
        league: League.find().fetch()
    };
})(ProfileContainer);

export default Profile;
