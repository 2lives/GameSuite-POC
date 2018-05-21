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

class CSGOContainer extends Component {
    render() {
        if (!this.props.userLoggedin || !this.props.userLoggedin.length) {
            return <p>loading</p>;
        } else {
            console.log(this.props.userLoggedin[0].profile.steam.csgo);
            return (
                <div>
                    <Card style={styles}>
                        <div style={styles.cardWrapper}>
                            <div style={styles.cardHeader}>
                                <CardHeader
                                    title="Counter Strike: Global Offensive"
                                    subtitle="Valve"
                                    avatar="https://fam143.com/wp-content/uploads/2018/02/274120-counter-strike-global-offensive-macintosh-front-cover-1.jpg"
                                    style={styles.cardHeader}
                                />
                                <span style={styles.username}>Username:</span>
                                <CardTitle title="hello" style={styles.title} />
                            </div>

                            <CardText style={styles.cardText} />
                        </div>
                    </Card>
                </div>
            );
        }
    }
}
const CSGOCard = withTracker(() => {
    Meteor.subscribe('users');
    return {
        userLoggedin: Meteor.users.find().fetch()
    };
})(CSGOContainer);

export default CSGOCard;
