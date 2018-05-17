import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// const placeHolderId = '76561198041950916';

// HTTP.call(
//     'GET',
//     `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=08A68F74EB79852D80BF6CE55B8DBD5A&steamids=${placeHolderId}`,
//     {},
//     (error, result) => {
//         if (!error) {
//             SteamId.update(
//                 { user: 'static' },
//                 { $set: { steamUserData: result.content } },
//                 { upsert: true }
//             );
//         }
//     }
// );
if (Meteor.isServer) {
<<<<<<< HEAD
  Meteor.publish('steamId', function() {
    return SteamId;
  });
=======
    Meteor.publish('steamId', function championsPublication() {
        return SteamId;
    });
>>>>>>> b2ef2c3eb44b627b9a8e0c760db1450194738919
}

export const SteamId = new Mongo.Collection('steamId');
