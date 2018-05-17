import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Profile from '../imports/ui/containers/Profile';
import GameTile from '../imports/ui/containers/SelectAccUI';
// import GeneralChat from '../imports/ui/containers/GeneralChat';

const Routes = () => {
    return (
        <Switch>
            {/* <Route exact path="/login" component={Login} /> */}
            <Route exact path="/gameselect" component={GameTile} />
            <Route exact path="/" component={Profile} />
            {/* <Route exact path="/generalchat" component={GeneralChat} /> */}
            {/* <Route path="/*" component={NotFound} /> */}
        </Switch>
    );
};

export default Routes;
