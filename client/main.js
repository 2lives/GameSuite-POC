import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Champions } from '../imports/apis/fetchAPIs';

class userProfile extends Component {}

const userProfileContainer = withTracker(() => {
    Meteor.subscribe('champions');
    return {
        champions: Champions.find({}).fetch()
    };
})(userProfile);

Meteor.startup(
    ReactDOM.render(<userProfileContainer />, document.getElementById('root'))
);
