import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// document.getEle÷mentById('steamLogin');

if (Meteor.isServer) {
  Meteor.publish('steamId', function championsPublication() {
    return SteamId;
  });
}

export const SteamId = new Mongo.Collection('steamId');
