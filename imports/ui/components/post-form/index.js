import { Posts } from '/imports/api/posts/posts.js';
import { PostImages } from '/imports/api/images/images.js';
import './post-form.html';
import './post-form.less';

Template.postForm.onCreated(function() {
  this.autorun(function() {
    Session.set('PostForm.droppedImages', '');
  });
});

Template.postForm.onDestroyed(function() {
  let image = Session.get('PostForm.droppedImages');
  PostImages.remove(image, (error) => {
    if (error) {
      console.log(error.reason);
    }
  });
});

Template.postForm.events({
  'submit form.new-post-form'(event, template) {
    event.preventDefault();

    let title = template.$('.new-post-form [name=title]').val().trim();
    let content = template.$('textarea.content').val().trim();
    let imageId = Session.get('PostForm.droppedImages');

    let post = {
      userId: Meteor.userId(),
      title: title,
      content: content,
      likes: [],
      comments: [],
      imageIds: [imageId],
    };

    try {
      Posts.schema.validate(post);
      Meteor.call('Posts.insert', post, (error, postId) => {
        if (error) {
          alert(error.reason);
        } else {
          event.target.reset();
          template.$('textarea.content').val('');
          Session.set('PostForm.droppedImages', '');
        }
      });
    } catch(error) {
      toastr.error(error.reason);
    }
  },
  'dropped #dropzone'(event, template) {
    event.preventDefault();

    FS.Utility.eachFile(event, (file) => {
      let newFile = new FS.File(file);

      let imageObj = PostImages.insert(newFile, (error, imageObj) => {
        if (error) {
          toastr.error('Upload failed: ' + error.reason);
        } else {
          toastr.success('Upload succeeded!');
          return imageObj;
        }
      });

      let image = Session.get('PostForm.droppedImages');
      PostImages.remove(image, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
      Session.set('PostForm.droppedImages', imageObj._id);
    });
  },
  'change .input-file-upload'(event, template) {
    FS.Utility.eachFile(event, (file) => {
      let newFile = new FS.File(file);

      let imageObj = PostImages.insert(newFile, (error, imageObj) => {
        if (error) {
          toastr.error('Upload failed: ' + error.reason);
        } else {
          toastr.success('Upload succeeded!');
          return imageObj;
        }
      });

      let image = Session.get('PostForm.droppedImages');
      PostImages.remove(image, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
      Session.set('PostForm.droppedImages', imageObj._id);
    });
  },
  'click .upload-file-button'(event, template) {
    $('.input-file-upload').click();
  },
});
