import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import LeagueLogin from '../components/LeagueLogin';
import FortniteLogin from '../components/FortniteLogin';

import SteamLogin from '../components/SteamLogin';

import { Link } from 'react-router-dom';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'grey'
  },
  gridList: {
    width: 700,
    height: 600,
    overflowY: 'auto'
  },
  steamBtn: {
    width: '80%'
  }
};

const GameGridList = () => (
  <div style={styles.root}>
    <GridList cellHeight="auto" style={styles.gridList}>
      <GridTile key="League">
        <img style={{ width: '100%' }} src="/assets/images/league-logo.png" />
        <LeagueLogin />
      </GridTile>

      <GridTile key="CS:GO">
        <img src="https://steamcdn-a.akamaihd.net/steam/subs/54029/header_586x192.jpg?t=1505435721" />
        <SteamLogin />
      </GridTile>

      <GridTile key="FortniteBR">
        <img
          style={{ width: '100%' }}
          src="https://res.cloudinary.com/lmn/image/upload/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyc/m/a/x/maxresdefault-7aaa5.jpg"
        />
        <FortniteLogin />
      </GridTile>

      {/* <GridTile key="StarCraft II">
        <img
          style={{ width: '100%' }}
          src="/assets/images/StarCraftII_Logo.jpg"
        /> */}

      {/* <FlatButton>Click Me!</FlatButton> */}
      {/* </GridTile> */}
    </GridList>
    <Link to={`/profile/${Meteor.userId()}`} style={{ textDecoration: 'none' }}>
      <FlatButton>Go to Profile</FlatButton>
    </Link>
  </div>
);

export default GameGridList;
