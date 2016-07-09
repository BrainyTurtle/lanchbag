import { Posts } from '/imports/api/posts/posts.js';
import { PostImages } from '/imports/api/images/images.js';
import './post.html';
import './post.less';

Template.post.onCreated(function() {
  var self = this;
  var imageId = this.data.imageIds[0];
  Tracker.autorun(function() {
    if (imageId) {
      Meteor.subscribe('images.one', imageId);
    }
  });
});

Template.post.onRendered(function() {
  $('.post-grid').isotope('reloadItems').isotope();
});

Template.post.helpers({
  postOwner() {
    return Meteor.users.findOne(this.userId).profile.username;
  },
  numLikes() {
    return this.likes.length;
  },
  numComments() {
    return this.comments.length;
  },
  hasLiked() {
    return this.hasCurrentUserLiked() ? 'has-liked' : '';
  },
  hasCommented() {
    return this.hasCurrentUserCommented() ? 'has-commented' : '';
  },
  timeFromNow(date) {
    return moment(date).fromNow();
  },
  profilePathData() {
    return { profileUserId: this.userId };
  },
  image() {
    // console.log(PostImages.findOne(this.imageIds[0]);
    return PostImages.findOne(this.imageIds[0]);
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
