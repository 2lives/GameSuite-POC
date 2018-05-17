import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class FortniteLogin extends Component {
    render() {
        return (
            <TextField
                hintText="Input your Epic Games ID here!"
                floatingLabelText="Epic Games ID"
            />
        );
    }
}

export default FortniteLogin;
