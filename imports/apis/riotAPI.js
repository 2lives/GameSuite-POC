import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

const League = new Mongo.Collection('league');
// const SummonerId = new Mongo.Collection('summonerid');

const apiKey = 'RGAPI-df014151-084c-4946-9f39-761b5d1805e1';
//  Meteor.methods({
//     'champions.getStaticData'(user) {
//find the passed most played champ id to here and find
//      }
//  });

// HTTP.call(
//     'GET',
//     `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=${apiKey}`,
//     { data: {} },
//     (error, result) => {
//         console.log(result.data);
//         if (!error) {
//             League.update(
//                 { user: 'static' },
//                 { $set: { LeagueChampionsStaticList: result.data } },
//                 { upsert: true }
//             );
//         }
//     }
// );

// const getSummonerId = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/calvintyvm?api_key=${apiKey}`;

// const summonerInfo = summonerId =>
//     `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/` +
//     summonerId +
//     `?api_key=${apiKey}`;

// const summonerId = fetch(getSummonerId)
//     .then(response => response.json())
//     .then(result => result.id)
//     .then(resp => summonerInfo(resp))
//     .then(result => fetch(result))
//     .then(resp => resp.json())
//     .then(result =>
//         League.update(
//             { user: 'static' },
//             { $set: { SummonerMasteryInfo: result[0] } },
//             { upsert: true }
//         )
//     );

// const summonerName = fetch(getSummonerId)
//     .then(response => response.json())
//     .then(result => result.name);

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}
//from profile pass in user object with champion id (most played) then use it to find here
export default League;
