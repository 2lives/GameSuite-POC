import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Routes from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { League } from '../imports/apis';
import { Fortnite } from '../imports/apis';

import AccountStepper from '../imports/ui/SelectAccUI';
import muiTheme from '../config/themes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GameGridList from '../imports/ui/SelectAccUI';

class GameSuiteContainer extends Component {
    //     getProfile(user) {
    //         Meteor.call('fortnite.getProfile');
    //     }
    //     getStaticData() {
    //         Meteor.call('champions.getStaticData');
    //     }

    render() {
        //    console.log(this.props.fortnite);
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Router>
                    <Routes />
                </Router>
            </MuiThemeProvider>
        );
    }
}

const GameSuite = withTracker(() => {
    Meteor.subscribe('fortnite', 'league');
    return {
        fortnite: Fortnite.find().fetch(),
        league: League.find().fetch()
    };
})(GameSuiteContainer);

Meteor.startup(() => {
    ReactDOM.render(<GameSuite />, document.getElementById('root'));
});
