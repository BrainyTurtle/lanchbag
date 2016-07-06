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
});

Router.route('/user/:profileUserId', {
  name: 'profilePage',
  yieldRegions: {
    'navbar': {to: 'header'},
    'profilePage': {to: 'body'},
  },
  onBeforeAction: function() {
    var currentUser = Meteor.userId();
    if (currentUser) {
      this.next();
    } else {
      Router.go('homePage');
    }
  },
  waitOn: function() {
    return Meteor.subscribe('users.one', this.params.profileUserId);
  },
  data: function() {
    var profileUser = Meteor.users.findOne({
      $or: [
        {_id: this.params.profileUserId},
        {"profile.username": this.params.profileUserId},
      ],
    });

    if (profileUser) {
      var isProfileOwner = !!(Meteor.userId() === profileUser._id);
      return {
        profileUser: profileUser,
        isProfileOwner: isProfileOwner,
      };
    }
  },
});
