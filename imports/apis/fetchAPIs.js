import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const leagueChampionDataURL =
    'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false';

request(leagueChampionDataURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        const leagueChampionData = JSON.parse(body);
        res.send(leagueChampionData);

        const MongoClient = require('mongodb').MongoClient;
        const url = 'mongodb://localhost:27017/mondb';

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            const myobj = data;
            db.collection(Champions).insert(myobj, function(err, res) {
                if (err) throw err;
                console.log(
                    'Number of documents inserted: ' + res.insertedCount
                );
                db.close();
            });
        });
    }
});

if (Meteor.isServer) {
    Meteor.publish('champions', function championsPublication() {
        return Champions;
    });
}

export const Champions = new Mongo.Collection('champions');
