export const Profiles = new Meteor.Collection('profiles');

if (typeof Schema === 'undefined') {
  Schema = function Schema() {}
}

Profiles.schema = new SimpleSchema({
  userId: {
    type: String,
    unique: true,
  },
  following: {
    type: [String],
    defaultValue: [],
    optional: true,
  },
  followers: {
    type: [String],
    defaultValue: [],
    optional: true,
  },
  profilePicture: {
    type: String,
    defaultValue: '',
    optional: true,
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      } else {
        this.unset();
      }
    },
    denyUpdate: true,
    optional: true,
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date;
      }
    },
    denyInsert: true,
    optional: true,
  },
});

Profiles.attachSchema(Profiles.schema);

Profiles.helpers({
  isCurrentUserFollowing() {
    return this.followers.indexOf(Meteor.userId()) !== -1;
  },
  hasFollowing(userId) {
    return this.following.indexOf(userId) !== -1;
  },
  hasFollower(userId) {
    return this.followers.indexOf(userId) !== -1;
  },
});
