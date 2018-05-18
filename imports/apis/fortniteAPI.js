import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

// Meteor.methods({

// });
// export const getFortniteData = user =>
//     HTTP.call(
//         'GET',
//         `https://api.fortnitetracker.com/v1/profile/pc/${user}`,
//         {
//             headers: {
//                 'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
//             }
//         },
//         (error, result) => {
//             if (!error) {
//                 Meteor.users.update(
//                     { _id: 'user' },
//                     { $set: { 'profile.fortnite.data': result.content } },
//                     { upsert: true }
//                 );
//             }
//         }
//     );

if (Meteor.isServer) {
    Meteor.publish('fortnite', function() {
        return Fortnite.find();
    });
}
