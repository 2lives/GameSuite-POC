import { League } from '../../apis';
import { Fortnite } from '../../apis/';
import { Meteor } from 'meteor/meteor';

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
