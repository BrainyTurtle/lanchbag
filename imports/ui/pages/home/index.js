import { Posts } from '/imports/api/posts/posts.js'
import '/imports/ui/components/post-form';
import '/imports/ui/components/post';
import './home.html';
import './home.less';

Template.homePage.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },
});
