import { Posts } from '/imports/api/posts/posts.js';
import './posts.js';

Meteor.methods({
  'Posts.insert'(post) {
    var newPostId = Posts.insert(post, (error, postId) => {
      if (error) {
        console.log(error.reason);
      } else {
        return postId;
      }
    });
    return newPostId;
  },
  'Posts.remove'(postId) {
    check(postId, String);
    Posts.remove(postId, (error) => {
      if (error) {
        console.log(error.reason);
      }
    });
  },
  'Posts.toggleLike'(postId) {
    check(postId, String);
    var post = Posts.findOne(postId);
    if (post.hasCurrentUserLiked()) {
      Posts.update(postId, {
        $pull: {
          likes: Meteor.userId(),
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    } else {
      Posts.update(postId, {
        $addToSet: {
          likes: Meteor.userId(),
        },
      }, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    }
  },
});
