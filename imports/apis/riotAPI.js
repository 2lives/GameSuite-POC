import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import fetch from 'node-fetch';

const League = new Mongo.Collection('league');

const apiKey = 'RGAPI-59d48401-e274-4342-9a8c-63307fc46258';

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
