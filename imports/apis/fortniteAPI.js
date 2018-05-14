import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const Fortnite = new Mongo.Collection('fornite');

// Meteor.methods({
//     //user
//     'fortnite.getProfile'(user) {
//         console.log('hello');
//         HTTP.call(
//             'GET',
//             //template literals for user
//             `https://api.fortnitetracker.com/v1/profile/pc/calvintyvm`,
//             {
//                 headers: {
//                     'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
//                 }
//             },
//             (err, result) => {
//                 if (!err) Fortnite.insert(result);
//             }
//         );
//     }
// });

HTTP.call(
    'GET',
    'https://api.fortnitetracker.com/v1/profile/pc/calvintyvm',
    {
        headers: {
            'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
        }
    },
    (error, result) => {
        if (!error) {
            console.log(result);
            Fortnite.update(result, { upsert: true });
        }
    }
);

//async await

if (Meteor.isServer) {
    Meteor.publish('fortnite', function() {
        return Fortnite.find();
    });
}

export default Fortnite;