import { Profiles } from '/imports/api/profiles/profiles.js';
import './profiles.js';

Meteor.methods({
  'Profiles.insert'(userId) {
    return Profiles.insert({
      userId: userId,
    }, (error, profileId) => {
      if (error) {
        console.log(error.reason);
      } else {
        return profileId;
      }
    });
  },
  'Profiles.remove'(idType, id) {
    check(idType, String);
    check(id, String);
    if (idType === 'profileId') {
      Profiles.remove(id, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    } else if (idType === 'userId') {
      Profiles.remove(id, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    }
  },
  'Profiles.toggleFollowers'(userId) {
    check(userId, String);

    let userProfile = Profiles.findOne({userId: userId});
    if (userProfile.hasFollower(Meteor.userId())) {
      Profiles.update({
        userId: userId,
      }, {
        $pull: {
          followers: Meteor.userId(),
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    } else {
      Profiles.update({
        userId: userId,
      }, {
        $addToSet: {
          followers: Meteor.userId(),
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    }
  },
  'Profiles.toggleFollowing'(userId) {
    check(userId, String);

    let currentUserProfile = Profiles.findOne({userId: Meteor.userId()});
    if (currentUserProfile.hasFollowing(userId)) {
      Profiles.update({
        userId: Meteor.userId(),
      }, {
        $pull: {
          following: userId,
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        } else {
          Meteor.call('Profiles.toggleFollowers', userId);
        }
      });
    } else {
      Profiles.update({
        userId: Meteor.userId(),
      }, {
        $addToSet: {
          following: userId,
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        } else {
          Meteor.call('Profiles.toggleFollowers', userId);
        }
      });
    }
  },
});
