import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import Profile from '../imports/ui/containers/Profile';

const Routes = () => {
    return (
        <Switch>
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/gameselect" component={SelectAccUI} /> */}
            <Route path="/" component={Profile} />
            {/* <Route path="/*" component={NotFound} /> */}
        </Switch>
    );
};

export default Routes;
