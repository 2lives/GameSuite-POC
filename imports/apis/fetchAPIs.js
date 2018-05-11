import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const request = require('request');

const leagueChampionDataURL =
    'ttps://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=RGAPI-96fda0b2-13c9-448d-b576-47061b905c50';

request(leagueChampionDataURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const leagueChampionData = JSON.parse(body);
        res.send(leagueChampionData);

        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://localhost:27017/mondb';

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const myobj = data;
            db.collection('champions').insert(myobj, function(err, res) {
                if (err) throw err;
                console.log('Docs inserted: ' + res.insertedCount);
                db.close();
            });
        });
    }
});

export const Champions = new Mongo.Collection('champions');
