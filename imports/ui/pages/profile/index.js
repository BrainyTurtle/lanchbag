import { Template } from 'meteor/templating';
import './profilePage.html';
import './profilePage.less';

Template.profilePage.onCreated(function() {
  if (!this.data) {
    Router.go('homePage');
  }
});
