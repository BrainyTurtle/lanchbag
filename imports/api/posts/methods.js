import { Posts } from '/imports/api/posts/posts.js';
import './posts.js';

Meteor.methods({
  'Posts.insert': function(post) {
    var newPostId = Posts.insert(post, (error, postId) => {
      if (error) {
        console.log(error.reason);
      } else {
        return postId;
      }
    });
    return newPostId;
  },
});
