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
 * Fetch CS:GO Stats from database
 */
const APIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';
const placeHolderId = '76561198041950916';

Meteor.methods({
  'Meteor.users.GetCSGOStats'(result) {
    HTTP.call(
      'GET',
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${APIkey}&steamid=${placeHolderId} `,
      {},
      (error, result) => {
        if (!error) {
          Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile.steam.csgo': result } },
            { upsert: true }
          );
          const steamUserKey = Meteor.userId().find(user.profile.steam.id);
          console.log(steamUserKey);
        }
      }
    );
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
