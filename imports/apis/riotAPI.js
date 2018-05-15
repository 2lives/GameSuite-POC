import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Champions = new Mongo.Collection('champions');

//  Meteor.methods({
//     'champions.getStaticData'(user) {

//      }
//  });

HTTP.call(
  'GET',
  'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=RGAPI-66ce1e6e-fb4c-4e20-b5b9-da88dbe8b2db',
  {},
  (error, result) => {
    if (!error) {
      console.log(result);
      Champions.update(
        { user: 'static' },
        { $set: { leagueChampions: result.content } },
        { upsert: true }
      );
    }
  }
);

//async await

if (Meteor.isServer) {
  Meteor.publish('champions', function() {
    return Champions.find();
  });
}

export default Champions;
