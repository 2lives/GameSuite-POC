import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Champions } from '../imports/apis';
import { Fortnite } from '../imports/apis';

class userProfiles extends Component {
    getProfile(user) {
        Meteor.call('fortnite.getProfile', calvintyvm);
    }
}

const userProfilesContainer = withTracker(() => {
    Meteor.subscribe('fortnite');
    return {
        fortnite: Fortnite.find({}).fetch()
    };
})(userProfiles);

Meteor.startup(
    ReactDOM.render(<userProfilesContainer />, document.getElementById('root'))
);
