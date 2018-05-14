import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block'
};

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>hello friends</h1>
                <Paper style={style} />
            </div>
        );
    }
}

export default Profile;
