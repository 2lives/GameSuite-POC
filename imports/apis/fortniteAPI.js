import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

const Fortnite = new Mongo.Collection('fortnite');

// Meteor.methods({

// });

HTTP.call(
    'GET',
    `https://api.fortnitetracker.com/v1/profile/pc/${user}`,
    {
        headers: {
            'TRN-Api-Key': 'e5c756b6-f460-45e3-9653-d878c0a535dc'
        }
    },
    (error, result) => {
        if (!error) {
            Fortnite.update(
                { _id: user },
                { $set: { 'services.fortnite': result.content } },
                { upsert: true }
            );
        }
    }
);

//async await
// console.log(Fortnite.find().fetch());
if (Meteor.isServer) {
    Meteor.publish('fortnite', function() {
        return Fortnite.find();
    });
}

export default Fortnite;
