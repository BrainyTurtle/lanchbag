
if (Meteor.isServer) {
  var imageStore = new FS.Store.S3('postImages', {
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket
  });
  export const PostImages = new FS.Collection('postImages', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        console.log(message);
      },
    }
  });
}

if (Meteor.isClient) {
  var imageStore = new FS.Store.S3('postImages');
  export const PostImages = new FS.Collection('postImages', {
    stores: [imageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        toastr.error(message);
      },
    }
  });
}

PostImages.allow({
  insert: userId => !!userId,
  update: userId => !!userId,
  remove: userId => !!userId,
  download: () => true,
});
