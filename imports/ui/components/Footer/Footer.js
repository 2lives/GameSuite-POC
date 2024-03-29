import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
    height: 50,
    width: '100vw',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: '#4527A0',
    position: 'absolute'
};

const Footer = () => <Paper style={style} zDepth={0} />;

export default Footer;
