import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import Routes from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { League } from '../imports/apis';

import muiTheme from '../config/themes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GameGridList from '../imports/ui/containers/SelectAccUI';
import HeaderBar from '../imports/ui/components/HeaderBar';
import AccountsUIWrapper from '../imports/ui/components/AccountsWrapper';
import Layout from '../imports/ui/components/Layout';

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
        <div>
          <div className="login-wrapper">
            <AccountsUIWrapper />
          </div>
          <Router>
            <Layout>
              <Routes />
            </Layout>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

const GameSuite = withTracker(() => {
  Meteor.subscribe('league');
  return {
    league: League.find().fetch()
  };
})(GameSuiteContainer);

Meteor.startup(() => {
  ReactDOM.render(<GameSuite />, document.getElementById('root'));
});
