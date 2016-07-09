import { Template } from 'meteor/templating';
import { Posts } from '/imports/api/posts/posts.js';
import { Profiles } from '/imports/api/profiles/profiles.js';
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

Template.profilePage.onRendered(function() {
  var resizeLayout = () => {
    var profilePageWidth = $('.profile-page').width();
    var asideWidth = $('.aside').outerWidth();
    if ($(window).width() > 665) {
      $('.wall').width(profilePageWidth - asideWidth);
    } else {
      $('.wall').width("100%");
    }
  }

  resizeLayout();
  $(window).resize(function() {
    resizeLayout();
  });

  $('.posts-grid').isotope({
    itemSelector: '.post',
    masonry: {
      columnWidth: '.post',
      gutter: '.post-grid-gutter-sizer',
    },
  });
});

Template.profilePage.helpers({
  profile() {
    return Profiles.findOne();
  },
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
  numPosts() {
    return Posts.find({userId: this._id}).count();
  },
  numFollowers() {
    return Profiles.findOne().followers.length;
  },
});

Template.profilePage.events({
  'click .user-picture'(event, template) {
    event.preventDefault();
    if (this.isCurrentUser()) {
      $('.profile-pic-modal').modal('show');
    }
  },
  'click .user-follow-button'(event, template) {
    event.preventDefault();
    Meteor.call('Profiles.toggleFollowing', this._id);
  },
});
