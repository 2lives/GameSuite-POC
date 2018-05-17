import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class LeagueLogin extends Component {
    render() {
        return (
            <TextField
                hintText="Input your summoner name here!"
                floatingLabelText="Summoner Name"
            />
        );
    }
}

export default LeagueLogin;
