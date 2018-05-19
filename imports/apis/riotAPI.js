import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

const League = new Mongo.Collection('league');

const apiKey = 'RGAPI-9023d4dc-f5b9-47f9-9312-7cbf9908a5a4';

HTTP.call(
    'GET',
    `https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=${apiKey}`,
    { data: {} },
    (error, result) => {
        if (!error) {
            League.update(
                { user: 'static' },
                { $set: { LeagueChampionsStaticList: result } },
                { upsert: true }
            );
        }
    }
);

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}
export default League;
