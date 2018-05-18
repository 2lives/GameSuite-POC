import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const placeHolderId = '76561198041950916';
const APIkey = '08A68F74EB79852D80BF6CE55B8DBD5A';

// const csGOstatgrab = () => {
//   HTTP.call(
//     'GET',
//     `http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=${APIkey}&steamid=${placeHolderId} `,
//     {},
//     (error, result) => {
//       if (!error) {
//         Meteor.call('Meteor.users.GetCSGOStats', result.content);
//       } else {
//         console.log(error);
//       }
//     }
//   );
// };

// export default csGOstatgrab;
