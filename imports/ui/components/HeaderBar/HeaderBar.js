import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AutoComplete from 'material-ui/AutoComplete';
import { Link, Route } from 'react-router-dom';
import SearchBar from '../SearchBar';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
//TODO change the data to meteor users

const styles = {
  zIndex: '0'
};

class HeaderBar extends Component {
  render() {
    return (
      <AppBar
        title="GameSuite"
        showMenuIconButton={false}
        style={styles}
        iconElementRight={
          <div>
            <Link to={`/profile/${Meteor.userId()}`}>
              <FlatButton style={{ color: 'white' }} label="Profile" />
            </Link>

            <Link to={'/gameselect'}>
              <FlatButton style={{ color: 'white' }} label="Add Games" />
            </Link>

            <Link to={'/generalchat'}>
              <FlatButton
                style={{ marginRight: '200px', color: 'white' }}
                label="Chat"
              />
            </Link>
          </div>
        }
      >
        {/* <Route exact path="/" render={() => <SearchBar />} /> */}
      </AppBar>
    );
  }
}

export default HeaderBar;
