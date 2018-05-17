import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const placeHolderId = '76561198041950916';
const APIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';

// Meteor.methods({
//   CurrentUserId() {
//     Meteor.userId();
//   }
// });

// HTTP.call(
//   'GET',
//   `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${APIkey}&steamids=${placeHolderId}`,
//   {},
//   (error, result) => {
//     if (!error) {
//       Meteor.users.update(
//         { _id: Meteor.call(UserId()) },
//         { $set: { 'services.steam.profile': result.content } },
//         { upsert: true }
//       );
//     } else {
//       console.log(error);
//     }
//   }
// );

// if (Meteor.isServer) {
//   Meteor.publish('steamId', function() {
//     return SteamId;
//   });
// }

// export const SteamId = new Mongo.Collection('steamId');
