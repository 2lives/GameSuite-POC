import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const Fortnite = new Mongo.Collection('fortnite');

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

// HTTP.call(
//     'GET',
//     'https://api.fortnitetracker.com/v1/profile/pc/calvintyvm',
//     {
//         headers: {
//             'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
//         }
//     },
//     (error, result) => {
//         if (!error) {
//   Fortnite.update(
//       { user: 'calvintyvm' },
//       { $set: { profile: result.content } },
//       { upsert: true }
//   );
//         }
//     }
// );

// async function
const fetchAsync = async () => {
    let response = await HTTP.call(
        'GET',
        'https://api.fortnitetracker.com/v1/profile/pc/calvintyvm',
        {
            headers: {
                'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
            }
        }
    );
    let data = await response;
    return data;
};

fetchAsync()
    .then(data =>
        Fortnite.update(
            { user: 'calvintyvm' },
            { $set: { profile: result.content } },
            { upsert: true }
        )
    )
    .catch(reason => console.log(reason.message));

//async await
// console.log(Fortnite.find().fetch());
if (Meteor.isServer) {
    Meteor.publish('fortnite', function() {
        return Fortnite.find();
    });
}

export default Fortnite;
