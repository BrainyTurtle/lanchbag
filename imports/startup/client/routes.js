import { Router } from 'meteor/iron:router';
import '/imports/ui/pages/landing';
import '/imports/ui/pages/home';

Router.configure({
  layoutTemplate: 'mainLayout',
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
