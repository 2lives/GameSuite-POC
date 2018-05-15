import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import SteamLogin from '../components/SteamLogin';

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
        <TextField
          hintText="Input your summoner name here!"
          floatingLabelText="Summoner Name"
        />
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
        <TextField
          hintText="Input your Epic Games ID here!"
          floatingLabelText="Epic Games ID"
        />
      </GridTile>
    </GridList>
  </div>
);

export default GameGridList;
