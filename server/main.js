import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

import { Accounts } from 'meteor/accounts-base';
import mainServer from '../imports/start-up/server';
import Messages from '../imports/apis/GeneralChatAPI';
import SteamProfile from '../imports/apis/steamAPI';

const LeagueAPIKey = 'RGAPI-59d48401-e274-4342-9a8c-63307fc46258';
const SteamAPIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';

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

/*************************** Meteor  Methods *********************************/

Meteor.methods({
  /**
   * Adds user GameSuiteID on create input
   */
  'Meteor.users.CreateGameSuiteID'(input) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.gamesuite.id': input } },
      { upsert: true }
    );
  },
  'Meteor.users.CreateGameSuiteBio'(input) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.gamesuite.bio': input } },
      { upsert: true }
    );
  },
  /** _____________________________Messages___________________________ */
  /**
   * posting to messages collection
   */
  'Meteor.messages.postMessage'(message) {
    console.log(message);
    Messages.insert([{ poster: Meteor.userId() }, { text: message }]);
  },

  /** ______________________________Steam___________________________ */
  /**
   * Gets steam profile summary from ID
   */
  'Meteor.users.GetSteamProfile'(result) {
    const steamId = Meteor.users.findOne({ _id: Meteor.userId() }).profile.steam
      .id;
    console.log(steamId);
    HTTP.call(
      'GET',
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${SteamAPIkey}&steamids=${steamId}`,
      {},
      (error, result) => {
        if (!error) {
          Meteor.users.update(
            { _id: Meteor.userId() },
            {
              $set: {
                'profile.steam.steamProfile': JSON.parse(result.content)
              }
            },
            { upsert: true }
          );
        }
      }
    );
  },
  /**
   *  Gets Steam Profile ID and grabs CSGO game data
   */
  'Meteor.users.GetCSGOStats'(result) {
    const steamId = Meteor.users.findOne({ _id: Meteor.userId() }).profile.steam
      .id;
    console.log(steamId);
    HTTP.call(
      'GET',
      `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${SteamAPIkey}&steamid=${steamId} `,
      {},
      (error, result) => {
        if (!error) {
          Meteor.users.update(
            { _id: Meteor.userId() },
            {
              $set: {
                'profile.steam.csgo': JSON.parse(result.content)
              }
            },
            { upsert: true }
          );
        }
      }
    );
  },
  /** ______________________________Fortnite BR___________________________ */
  /**
   *  Inserts Fortnite ID in to user object
   */
  'Meteor.users.InsertFortnite'(input) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      { $set: { 'profile.fortnite.id': input } },
      { upsert: true }
    );
  },
  /**
   * Fetches user FortniteData based off of FortniteID in user object
   */
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
  },
  /** ______________________________League of Legends ___________________________ */
  /**
   * Gets summonerID by querying with the user object's Summoner Name
   */

  //     'Meteor.league.GetChampionList'() {
  //         HTTP.call(
  //             'GET',
  //             `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=${LeagueAPIKey}`,
  //             { data: {} },
  //             (error, result) => {
  //                 if (!error) {
  //                     League.update(
  //                         { user: 'static' },
  //                         { $set: { LeagueChampionsStaticList: result } },
  //                         { upsert: true }
  //                     );
  //                 }
  //             }
  //         );
  //     },
  'Meteor.users.FetchLeagueData'(summonerName) {
    const getSummonerId = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${LeagueAPIKey}`;

    const summonerInfo = summonerId =>
      `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/` +
      summonerId +
      `?api_key=${LeagueAPIKey}`;
    /**
     * Gets champion mastery and account data by querying with the user object's SummonerID
     */
    const summonerId = fetch(getSummonerId)
      .then(response => response.json())
      .then(result => result.id)
      .then(resp => summonerInfo(resp))
      .then(result => fetch(result))
      .then(resp => resp.json())
      .then(result =>
        Meteor.users.update(
          { _id: Meteor.userId() },
          { $set: { 'profile.league.data': result[0] } },
          { upsert: true }
        )
      );
    const getSummonerName = fetch(getSummonerId)
      .then(response => response.json())
      .then(result =>
        Meteor.users.update(
          { _id: Meteor.userId() },
          { $set: { 'profile.league.AccData': result } },
          { upsert: true }
        )
      );
  }
});

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return;
    users: Meteor.users.find();
  });
}

/*************************** Meteor StartUp *********************************/
Meteor.startup(() => {
  /**
   * Register steam login configuration
   */
  ServiceConfiguration.configurations.upsert(
    { service: 'steam' },
    {
      $set: {
        loginStyle: 'popup',
        timeout: 10000
      }
    }
  );
  /**
   * Register blizzard login configuration
   */
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
