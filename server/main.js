import { Meteor } from 'meteor/meteor';

import { Accounts } from 'meteor/accounts-base';
import mainServer from '../imports/start-up/server';

Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    { service: 'steam' },
    {
      $set: {
        loginStyle: 'redirect',
        timeout: 10000
      }
    }
  );
});

Accounts.validateNewUser(user => {
  if (user.services.steam) {
    Meteor.users.update(
      { _id: Meteor.userId() },
      {
        $set: { 'services.steam': user.services.steam }
      },
      { upsert: true }
    );
    return false;
  } else {
    return true;
  }
});
