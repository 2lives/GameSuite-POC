import React, { Component } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';

class SteamLogin extends Component {
  render() {
    return (
      <IconButton onClick={SteamId} style={{ width: '100%' }}>
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
      </IconButton>
    );
  }
}

const SteamId = function() {
  Meteor.loginWithSteam();
  console.log('clicked');
};

export default SteamLogin;
