import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from 'react-router-dom';
import Profile from '../imports/ui/containers/Profile';
import GameTile from '../imports/ui/containers/SelectAccUI';
import Login from '../imports/ui/containers/Login';
import GeneralChat from '../imports/ui/containers/GeneralChat';

// import GeneralChat from '../imports/ui/containers/GeneralChat';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/gameselect" component={GameTile} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/generalchat" component={GeneralChat} />
            {/* <Route path="/*" component={NotFound} /> */}
        </Switch>
    );
};

export default Routes;
