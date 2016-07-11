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
  }).on( 'removeComplete', function( event, removedItems ) {
    console.log( 'Removed ' + removedItems.length + ' items' );
  });
});

Template.homePage.helpers({
  posts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },
});
