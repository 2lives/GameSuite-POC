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

const apiKey = 'RGAPI-ea8583a6-73a4-466c-925e-704de8e1abb1';
const getSummonerId = `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/calvintyvm?api_key=${apiKey}`;

const summonerInfo = summonerId =>
    `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/` +
    summonerId +
    `?api_key=${apiKey}`;

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

const summonerName = fetch(getSummonerId)
    .then(response => response.json())
    .then(result => result.name);

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}

export default League;
