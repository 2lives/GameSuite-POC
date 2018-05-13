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
    'https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&champListData=image&champListData=info&dataById=false&api_key=RGAPI-83b8099b-f0ba-4958-81d1-91e0d7d7456c',
    {},
    (error, result) => {
        if (!error) {
            console.log(result);
            Champions.insert(result);
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
