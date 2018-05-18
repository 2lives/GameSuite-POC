import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

import { Accounts } from 'meteor/accounts-base';
import mainServer from '../imports/start-up/server';

import SteamProfile from '../imports/apis/steamAPI';

const LeagueAPIKey = 'RGAPI-8f2b435f-574f-4bb5-aa33-1a7e36d36432';

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
    'Meteor.users.GetCSGOStats'(result) {
        const APIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';
        const steamId = Meteor.users.findOne({ _id: Meteor.userId() }).profile
            .steam.id;
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
    },
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
    },
    'Meteor.users.FetchLeagueData'(summonerName) {
        const getSummonerId = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${LeagueAPIKey}`;

        const summonerInfo = summonerId =>
            `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/` +
            summonerId +
            `?api_key=${LeagueAPIKey}`;

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
            .then(result => console.log(result.name));
    }
});
