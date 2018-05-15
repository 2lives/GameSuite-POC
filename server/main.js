import { Meteor } from 'meteor/meteor';
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
