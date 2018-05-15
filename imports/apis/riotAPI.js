import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const League = new Mongo.Collection('league');

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
  }
);

//async await

if (Meteor.isServer) {
    Meteor.publish('league', function() {
        return League.find();
    });
}

export default League;
