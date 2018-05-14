import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Routes from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Champions } from '../imports/apis';
import { Fortnite } from '../imports/apis';

<<<<<<< HEAD
import AccountStepper from '../imports/ui/SelectAccUI';
import { MuiThemeProvider } from 'material-ui/styles';
import muiTheme from '../config/themes';
=======
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GameGridList from '../imports/ui/SelectAccUI';
>>>>>>> 752e89d3b7964321e3816e6a8c6baca6258740d9

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
