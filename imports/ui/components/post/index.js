import { Posts } from '/imports/api/posts/posts.js';
import './post.html';
import './post.less';

Template.post.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },
  postOwner() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  numLikes() {
    return this.likes.length;
  },
  numComments() {
    return this.comments.length;
  },
  timeFromNow(date) {
    return moment(date).fromNow();
  },
  profilePathData() {
    return { profileUserId: this.userId };
  },
});

Template.post.events({
  'click a.action-like'(event, template) {
    event.preventDefault();

    if (this._id) {
      Meteor.call('Posts.toggleLike', this._id, (error) => {
        if (error) {
          alert(error.reason);
        }
      });
    }
  },
});
