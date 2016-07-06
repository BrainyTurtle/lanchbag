import { Posts } from '../posts.js';

Meteor.publish('posts.all', function() {
  return Posts.find();
});

Meteor.publish('posts.one', function(postId) {
  check(postId, String);
  return Posts.find(postId);
});

Meteor.publish('posts.fromUser', function(userId) {
  check(userId, String);
  return Posts.find({userId: userId});
});

Meteor.publish('posts.fromUsers', function(userIds) {
  check(userIds, [String]);
  return Posts.find({
    userId: {
      $in: userIds,
    },
  });
});
