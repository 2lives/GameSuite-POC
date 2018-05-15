import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Routes from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Champions } from '../imports/apis';
import { Fortnite } from '../imports/apis';

import AccountStepper from '../imports/ui/SelectAccUI';
import muiTheme from '../config/themes';
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

const GameSuite = () => (
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router>
            <Routes />
        </Router>
    </MuiThemeProvider>
);

Meteor.startup(() => {
    ReactDOM.render(<GameSuite />, document.getElementById('root'));
});
