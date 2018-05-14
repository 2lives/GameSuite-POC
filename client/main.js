import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Champions } from '../imports/apis';
import { Fortnite } from '../imports/apis';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GameGridList from '../imports/ui/SelectAccUI';

class userProfiles extends Component {
    getProfile(user) {
        Meteor.call('fortnite.getProfile');
    }
    getStaticData() {
        Meteor.call('champions.getStaticData');
    }
}

// const UserProfilesContainer = withTracker(() => {
//     Meteor.subscribe('fortnite', 'champions');
//     return {
//         fortnite: Fortnite.find({}).fetch(),
//         champions: Fortnite.find({}).fetch()
//     };
// })(userProfiles);

Meteor.startup(
    ReactDOM.render(
    <MuiThemeProvider>
        <GameGridList />
    </MuiThemeProvider>
    , document.getElementById('root'))
);
