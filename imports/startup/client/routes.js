import { Router } from 'meteor/iron:router';
import '/imports/ui/layouts/main-layout';
import '/imports/ui/pages/loading';
import '/imports/ui/pages/landing';
import '/imports/ui/pages/home';
import '/imports/ui/pages/profile';

Router.configure({
  layoutTemplate: 'mainLayout',
  loadingTemplate: 'loading',
});

Router.route('/', {
  name: 'landingPage',
  yieldRegions: {
    'navbar': {to: 'header'},
    'landingPage': {to: 'body'},
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      Router.go('homePage');
    } else {
      this.next();
    }
  },
});

Router.route('/home', {
  name: 'homePage',
  yieldRegions: {
    'navbar': {to: 'header'},
    'homePage': {to: 'body'},
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      Router.go('landingPage');
    }
  },
  waitOn: function() {
    Meteor.subscribe('posts.all');
    Meteor.subscribe('users.all');
  },
});

Router.route('/user/:profileUserId', function() {
  this.wait(Meteor.subscribe('users.one', this.params.profileUserId));
  this.wait(Meteor.subscribe('posts.fromUser', this.params.profileUserId));
  this.wait(Meteor.subscribe('profiles.fromUser', this.params.profileUserId));

  if (this.ready()) {
    this.render('navbar', {to: 'header'});
    this.render('profilePage', {to: 'body'});
    this.next();
  } else {
    this.render('navbar', {to: 'header'});
    this.render('loading', {to: 'body'});
  }
}, {
  name: 'profilePage',
  data: function() {
    var profileUser = Meteor.users.findOne({
      $or: [
        {_id: this.params.profileUserId},
        {"profile.username": this.params.profileUserId},
      ],
    });
    if (profileUser) {
      var isProfileOwner = Meteor.userId() === profileUser._id;
      return {
        profileUser: profileUser,
        isProfileOwner: isProfileOwner,
      }
    }
  },
});
