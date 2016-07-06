import { Template } from 'meteor/templating';
import { Posts } from '/imports/api/posts/posts.js';
import './profilePage.html';
import './profilePage.less';

Template.profilePage.onCreated(function() {
  if (!this.data) {
    Router.go('homePage');
  }
});

Template.profilePage.helpers({
  username() {
    return Template.instance().data.profileUser.profile.username;
  },
  posts() {
    return Posts.find(
      {userId: this.profileUser._id},
      {sort: {createdAt: -1},
    }).fetch();
  },
  timeFromNow(date) {
    return moment(date).fromNow();
  },
});
