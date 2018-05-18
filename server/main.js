import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';
import mainServer from '../imports/start-up/server';

import SteamProfile from '../imports/apis/steamAPI';

Meteor.startup(() => {
    ServiceConfiguration.configurations.upsert(
        { service: 'steam' },
        {
            $set: {
                loginStyle: 'popup',
                timeout: 10000
            }
        }
    );
    //   ServiceConfiguration.configurations.upsert(
    //     { service: 'battlenet' },
    //     {
    //       $set: {
    //         clientId: '8gxaf95jd99wm2xgt9hdkrxqpwm95fex',
    //         scope: 'sc2.profile',
    //         secret: 'W4EAyCKRRhjJKdMjpfX6kASydrYtdkaG'
    //       }
    //     }
    //   );
});

/**
 * Adds steam user profile to existing logged in meteor account (if it exists)
 */
Accounts.validateNewUser(user => {
    if (user.services.steam) {
        Meteor.users.update(
            { _id: Meteor.userId() },
            {
                $set: { 'services.steam': user.services.steam }
            },
            { upsert: true }
        );
        return false;
    } else {
        return true;
    }
});
/**
 * Adds fortnite data to user object
 */
export const FortniteUpdate = event => {
    Meteor.users.update(
        { _id: Meteor.userId() },
        { $set: { 'services.fortnite.id': this.state.value } }
    );
};
