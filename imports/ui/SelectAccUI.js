import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import LeagueLogo from '../../assets/images/league-logo.png'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img: 'http://via.placeholder.com/350x150',
    title: 'League of Legends',
    author: 'Riot Games',
  },
  {
    img: 'http://via.placeholder.com/350x150',
    title: 'CS:GO',
    author: 'Valve',
  },
  {
    img: 'http://via.placeholder.com/350x150',
    title: 'Fortnite',
    author: 'Epic Games',
  },
];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const GameGridList = () => (
  <div style={styles.root}>

    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>

  </div>
);

export default GameGridList;