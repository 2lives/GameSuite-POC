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

// const fortnite = Meteor.fortnite.find().fetch();
// console.log(this.props);
class ProfileContainer extends Component {
    render() {
        console.log(this.props);

        if (!this.props.fortnite || !this.props.fortnite.length) {
            return <p>loading</p>;
        } else {
            let fortniteProfile = JSON.parse(this.props.fortnite[0].profile);
            console.log(fortniteProfile.accountId);
            return (
                <div>
                    <Card>
                        <CardHeader
                            title={fortniteProfile.epicUserHandle} //GameSuite username
                            //    subtitle=
                            avatar="https://res.cloudinary.com/teepublic/image/private/s--8LWtGSfC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1522032181/production/designs/2529444_0.jpg"
                        />
                        <CardTitle title="Fortnite" subtitle="Epic Games" />
                        <CardText>
                            Win Ratio %:{' '}
                            {fortniteProfile.stats.p2.winRatio.value}
                        </CardText>
                    </Card>
                    {/* split */}
                    <Card>
                        <CardHeader
                            title={this.props.fortnite[0].user}
                            subtitle="calvin" //{this.props.fortnite[0].profile}
                            avatar="https://media.lolusercontent.com/api/embedly/1/image/resize?url=http%3A%2F%2Fi.imgur.com%2FxNLs83T.png&key=a45e967db0914c7fb472fd4381e6c85b&width=425"
                        />
                        <CardTitle
                            title="League of Legends"
                            subtitle="Riot Games"
                        />
                        <CardText>Calvin is bad at League of Legends</CardText>
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
