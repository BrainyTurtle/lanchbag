import { Posts } from '/imports/api/posts/posts.js'
import '/imports/ui/components/post-form';
import '/imports/ui/components/post';
import './home.html';
import './home.less';

Template.homePage.onRendered(function() {
  $('.post-grid').isotope({
    itemSelector: '.post',
    masonry: {
      columnWidth: '.post',
      gutter: '.post-grid-gutter-sizer',
    },
  });
});

Template.homePage.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },
});

Template.homePage.uihooks({
  '.post': {
    container: '.post-grid',
    insert: function(node, next, tpl) {
      $(node).insertBefore(next);
    },
    remove: function(node, next, tpl) {
      $('.post-grid').isotope('remove', $(node)).isotope();
    },
  }
});
