import { Posts } from '/imports/api/posts/posts.js';
import './post-form.html';
import './post-form.less';

Template.postForm.events({
  'submit form.new-post-form'(event, template) {
    event.preventDefault();

    let title = template.$('.new-post-form [name=title]').val().trim();
    let content = template.$('textarea.content').val().trim();

    let post = {
      userId: Meteor.userId(),
      title: title,
      content: content,
      likes: [],
      comments: [],
    };

    // let isValid = Match.test(post, Posts.simpleSchema());
    // if (isValid) {
      Meteor.call('Posts.insert', post, (error, postId) => {
        if (error) {
          alert(error.reason);
        } else {
          event.target.reset();
          template.$('textarea.content').val('');
        }
      });
    // } else {
    //   alert("Something went wrong");
    // }
  },
});
