import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Champions } from '../imports/apis';

class userProfile extends Component {}

Meteor.startup(
    ReactDOM.render(<userProfile />, document.getElementById('root'))
);
