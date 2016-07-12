import { Template } from 'meteor/templating';
import { Posts } from '/imports/api/posts/posts.js';
import { Profiles } from '/imports/api/profiles/profiles.js';
import { ProfileImages } from '/imports/api/images/images.js';
import './profilePage.html';
import './profilePage.less';

Template.profilePage.onCreated(function() {
  var self = this;
  var imageId = Profiles.findOne().profilePicture;
  Tracker.autorun(function() {
    if (!self.data) {
      Router.go('homePage');
    }
    Meteor.subscribe('profileImages.all');
  });
});

Template.profilePage.onRendered(function() {
  var resizeLayout = () => {
    var profilePageWidth = $('.profile-page').width();
    var asideWidth = $('.aside').outerWidth();
    if ($(window).width() > 665) {
      $('.wall').width(profilePageWidth - asideWidth);
    } else {
      $('.wall').width("100%");
    }
  }

  resizeLayout();
  $(window).resize(function() {
    resizeLayout();
  });

  $('.posts-grid').isotope({
    itemSelector: '.post',
    masonry: {
      columnWidth: '.post',
      gutter: '.post-grid-gutter-sizer',
    },
  });
});

Template.profilePage.helpers({
  profile() {
    return Profiles.findOne();
  },
  username() {
    return Template.instance().data.profileUser.profile.username;
  },
  posts() {
    return Posts.find(
      {userId: this.profileUser._id},
      {sort: {createdAt: -1},
    }).fetch();
  },
  timeFromNow(date) {
    return moment(date).fromNow();
  },
  numPosts() {
    return Posts.find({userId: this._id}).count();
  },
  numFollowers() {
    return Profiles.findOne().followers.length;
  },
  isFollowing() {
    return Profiles.findOne().hasFollower(Meteor.userId());
  },
  profileImage() {
    let imageId = Profiles.findOne({userId: this._id}).profilePicture;
    return ProfileImages.findOne(imageId);
  },
});

Template.profilePage.events({
  'click .user-picture'(event, template) {
    event.preventDefault();
    if (this.isCurrentUser()) {
      $('.profile-pic-modal').modal({
        onHide: function(){
          let imageId = Session.get('UserProfilePictureUpload.imageId');
          if (imageId) {
            ProfileImages.remove(imageId, (error) => {
              if (error) {
                console.log(error.reason);
              }
            });
          }
          Session.set('UserProfilePictureUpload.imageId', '');
        },
      }).modal('show');
    }
  },
  'click .user-follow-button'(event, template) {
    event.preventDefault();
    Meteor.call('Profiles.toggleFollowing', this._id);
  },
});


// ========== Profile Picture Upload Modal ==========

Template.userProfilePictureUpload.onCreated(function() {
  Tracker.autorun(function() {
    Session.set('UserProfilePictureUpload.imageId', '');
  });
});

Template.userProfilePictureUpload.helpers({
  previewImage() {
    let imageId = Session.get('UserProfilePictureUpload.imageId');
    return ProfileImages.findOne(imageId);
  },
});

Template.userProfilePictureUpload.events({
  'click #dropzone'(event, template) {
    $('.input-file-upload').click();
  },
  'submit form.profile-picture-form'(event, template) {
    event.preventDefault();

    let imageId = Session.get('UserProfilePictureUpload.imageId');

    if (imageId) {
      var currentImageId = Profiles.findOne().profilePicture;
      Meteor.call('Profile.updateProfileImage', imageId, (error) => {
        if (error) {
          toastr.error("Error: " + error.reason);
        } else {
          toastr.success("Profile picture updated!");
          ProfileImages.remove(currentImageId, (error) => {
            if (error) {
              console.log(error.reason);
            }
          });
        }
      })
    }

    Session.set('UserProfilePictureUpload.imageId', '');
    $('.profile-pic-modal').modal('hide');
  },
  'click button.cancel-btn'(event, template) {
    event.preventDefault();

    let imageId = Session.get('UserProfilePictureUpload.imageId');

    if (imageId) {
      ProfileImages.remove(imageId, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });
    }

    Session.set('UserProfilePictureUpload.imageId', '');
    $('.profile-pic-modal').modal('hide');
  },
  'dropped #dropzone'(event, template) {
    event.preventDefault();

    FS.Utility.eachFile(event, (file) => {
      let newFile = new FS.File(file);

      let imageObj = ProfileImages.insert(newFile, (error, imageObj) => {
        if (error) {
          console.log(error.reason);
        } else {
          return imageObj;
        }
      });

      let image = Session.get('UserProfilePictureUpload.imageId');
      ProfileImages.remove(image, (error) => {
        if (error) {
          console.log(error.reason);
        }
      });

      if (imageObj) {
        Session.set('UserProfilePictureUpload.imageId', imageObj._id);
      } else {
        Session.set('UserProfilePictureUpload.imageId', '');
      }
    });
  },
  'change .input-file-upload'(event, template) {
    FS.Utility.eachFile(event, (file) => {
      let newFile = new FS.File(file);

      let imageObj = ProfileImages.insert(newFile, (error, imageObj) => {
        if (error) {
          console.log(error.reason);
        } else {
          return imageObj;
        }
      });

      let imageId = Session.get('UserProfilePictureUpload.imageId');
      if (imageId) {
        ProfileImages.remove(imageId, (error) => {
          if (error) {
            console.log(error.reason);
          }
        });
      }

      if (imageObj) {
        Session.set('UserProfilePictureUpload.imageId', imageObj._id);
      } else {
        Session.set('UserProfilePictureUpload.imageId', '');
      }

      template.$('.loading').fadeIn(50);
      template.$('.image-preview img').load(function() {
        if ($(this).width() > $(this).height()) {
          $(this).addClass('wide');
        } else if ($(this).width() < $(this).height()) {
          $(this).addClass('tall');
        }
        template.$('.loading').fadeOut(50);
      });
    });
  },
});
