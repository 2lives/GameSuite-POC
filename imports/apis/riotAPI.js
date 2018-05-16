import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

const League = new Mongo.Collection('league');
const SummonerId = new Mongo.Collection('summonerid');

//  Meteor.methods({
//     'champions.getStaticData'(user) {

//      }
//  });

HTTP.call(
    'GET',
    'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=RGAPI-018c7371-8e87-491c-b46f-869b4245514d',
    {},
    (error, result) => {
        if (!error) {
            //   console.log(result);
            League.update(
                { user: 'static' },
                { $set: { leagueChampions: result.content } },
                { upsert: true }
            );
        }
    }
);
//TODO make template literal
const getSummonerId =
    'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/calvintyvm?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe';

const summonerId = fetch(getSummonerId)
    .then(response => response.json())
    .then(result => result.id);

const summonerInfo = summonerId => {
    'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' +
        summonerId +
        '?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe';
};

console.log(summonerInfo('DaiBey'));

//     HTTP.call(
//         'GET',
//         'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/calvintyvm?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe',
//         {},
//         (error, result) => {
//             if (!error) {
//                 League.update(
//                     { user: 'user' },
//                     { $set: { summonerId: result.data.id } },
//                     { upsert: true }
//                 );
//                 const summonerId = result.data.id;
//                 console.log(getSummonerId);
//             }
//         }
//     ),
//     HTTP.call(
//         'GET',
//         `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerId}?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe`,
//         {},
//         (error, result) => {
//             if (!error) {
//                 League.update(
//                     { user: 'user' },
//                     { $set: { summonerInfo: result.data } },
//                     { upsert: true }
//                 );
//                 console.log(result.data);
//             }
//         }
//     );

//     HTTP.call(
//         'GET',
//         'https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/56933117?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe',
//         {},
//         (error, result) => {
//             if (!error) {
//                 League.update(
//                     { user: 'user' },
//                     { $set: { summoner: result.content } },
//                     { upsert: true }
//                 );
//             }
//         }
//     );

//TODO after querying by summoner name, take the id, and make another query for summoner info
// https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/21044808?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe

//async await

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}

export default League;
