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
    'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe',
    {},
    (error, result) => {
        if (!error) {
            console.log(result);
            League.update(
                { user: 'static' },
                { $set: { LeagueChampionsStaticList: result.content } },
                { upsert: true }
            );
        }
    }
);
const getSummonerId =
    'https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/calvintyvm?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe';

const summonerInfo = summonerId =>
    'https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/' +
    summonerId +
    '?api_key=RGAPI-07be9afe-b5f6-4a6b-8506-0debf1dc09fe';

const summonerId = fetch(getSummonerId)
    .then(response => response.json())
    .then(result => result.id)
    .then(resp => summonerInfo(resp))
    .then(result => fetch(result))
    .then(resp => resp.json())
    .then(result =>
        League.update(
            { user: 'static' },
            { $set: { SummonerMasteryInfo: result[0] } },
            { upsert: true }
        )
    );

// console.log(league.find(championId));
//     const mostPlayed = LeagueChampionsStaticList.find()

const summonerName = fetch(getSummonerId)
    .then(response => response.json())
    .then(result => result.name);

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}

export default League;
