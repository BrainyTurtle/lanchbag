export const Posts = new Meteor.Collection('posts');

if (typeof Schema === 'undefined') {
  Schema = function Schema() {}
}

Posts.schema = new SimpleSchema({
  userId: {
    type: String
  },
  title: {
    type: String,
    min: 1,
    max: 30,
  },
  content: {
    type: String,
    min: 1,
    max: 10000,
  },
  likes: {
    type: [String],
    defaultValue: [],
    optional: true,
  },
  comments: {
    type: [String],
    defaultValue: [],
    optional: true,
  },
  imageIds: {
    type: [String],
    defaultValue: [],
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

Posts.attachSchema(Posts.schema);

Posts.helpers({
  hasCurrentUserLiked() {
    if (this.likes) {
      return this.likes.indexOf(Meteor.userId()) !== -1;
    }
  },
  hasCurrentUserCommented() {
    if (this.comments) {
      return this.comments.indexOf(Meteor.userId()) !== -1;
    }
  },
});
