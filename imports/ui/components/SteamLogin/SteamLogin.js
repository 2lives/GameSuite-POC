import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import csGOstatgrab from '../../components/SteamLogin';

class SteamLogin extends Component {
  SteamId() {
    Meteor.loginWithSteam(() => {
      Meteor.call('Meteor.users.GetCSGOStats');
      Meteor.call('Meteor.users.GetSteamProfile');
    });
    console.log('clicked');
  }
  render() {
    return (
      <IconButton onClick={this.SteamId} style={{ width: '100%' }}>
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
      </IconButton>
      // Meteor.user().profile.id;
    );
  }
}

export default SteamLogin;
