import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import AutoComplete from 'material-ui/AutoComplete';
import { Link, Route } from 'react-router-dom';
import SearchBar from '../SearchBar';
import AppBar from 'material-ui/AppBar';
//TODO change the data to meteor users

class HeaderBar extends Component {
    render() {
        return (
            <AppBar title="GameSuite" showMenuIconButton={false}>
                <Route exact path="/" render={() => <SearchBar />} />
            </AppBar>
        );
    }
}

export default HeaderBar;
