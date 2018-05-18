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
        $set: { 'profile.steam': user.services.steam }
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

Meteor.methods({
  'Meteor.users.InsertFortnite'(input) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.fortnite.id': input } },
      { upsert: true }
    );
  }
});
