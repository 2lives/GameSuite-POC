import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';

class SteamLogin extends Component {
  SteamId() {
    Meteor.loginWithSteam();
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
