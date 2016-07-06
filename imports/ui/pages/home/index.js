import { Posts } from '/imports/api/posts/posts.js'
import '/imports/ui/components/post-form';
import './home.html';
import './home.less';

Template.homePage.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },
  postOwner(userId) {
    return Meteor.users.findOne(userId).profile.username;
  },
  timeFromNow(date) {
    return moment(date).fromNow();
  },
});
