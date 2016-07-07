import { Template } from 'meteor/templating';
import { Posts } from '/imports/api/posts/posts.js';
import './profilePage.html';
import './profilePage.less';

Template.profilePage.onCreated(function() {
  var self = this;
  this.autorun(function() {
    if (!self.data) {
      Router.go('homePage');
    }
  });
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
