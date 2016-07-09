import { Profiles } from '../profiles.js';

Meteor.publish('profiles.all', function() {
  return Profiles.find();
});

Meteor.publish('profiles.one', function(profileId) {
  check(profileId, String);
  return Profiles.find(profileId);
});

Meteor.publish('profiles.fromUser', function(userId) {
  check(userId, String);
  return Profiles.find({userId: userId});
});
