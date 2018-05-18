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

Meteor.methods({
  'Meteor.users.GetCSGOStats'(result) {
    const APIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';
    const steamId = Meteor.users.findOne({ _id: Meteor.userId() }).profile.steam
      .id;
    console.log(steamId);
    HTTP.call(
      'GET',
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${APIkey}&steamid=${steamId} `,
      {},
      (error, result) => {
        if (!error) {
          Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile.steam.csgo': result } },
            { upsert: true }
          );
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
  },

  'Meteor.users.FetchFortniteData'(input) {
    HTTP.call(
      'GET',
      `https://api.fortnitetracker.com/v1/profile/pc/${input}`,
      {
        headers: {
          'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
        }
      },
      (error, result) => {
        if (!error) {
          Meteor.users.update(
            { _id: Meteor.userId() },
            { $set: { 'profile.fortnite.data': result.content } },
            { upsert: true }
          );
        }
      }
    );
  }
});
