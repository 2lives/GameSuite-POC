import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const placeHolderId = '76561198041950916';

// HTTP.call(
//   'GET',
//   'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=08A68F74EB79852D80BF6CE55B8DBD5A&steamids=76561198041950916',
//   {},
//   (error, result) => {
//     if (!error) {
//       JSON.parse(result) = this
//       SteamId.update(
//         { user: {resut} },
//         { $set: { steamIdNum: result.content } },
//         { upsert: true }
//       );
//     }
//   }
// );
if (Meteor.isServer) {
    Meteor.publish('steamId', function championsPublication() {
        return SteamId;
    });
}

export const SteamId = new Mongo.Collection('steamId');
