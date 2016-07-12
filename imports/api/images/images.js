
if (Meteor.isServer) {
  var postImageStore = new FS.Store.S3('postImages', {
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket,
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name).autoOrient().stream().pipe(writeStream);
    }
  });
  export const PostImages = new FS.Collection('postImages', {
    stores: [postImageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        console.log(message);
      },
    }
  });

  var profileImageStore = new FS.Store.S3('profileImages', {
    accessKeyId: Meteor.settings.AWSAccessKeyId,
    secretAccessKey: Meteor.settings.AWSSecretAccessKey,
    bucket: Meteor.settings.AWSBucket,
    transformWrite: function(fileObj, readStream, writeStream) {
      gm(readStream, fileObj.name).autoOrient().stream().pipe(writeStream);
    }
  });
  export const ProfileImages = new FS.Collection('profileImages', {
    stores: [profileImageStore],
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
  var postImageStore = new FS.Store.S3('postImages');
  export const PostImages = new FS.Collection('postImages', {
    stores: [postImageStore],
    filter: {
      allow: {
        contentTypes: ['image/*']
      },
      onInvalid: function(message) {
        toastr.error(message);
      },
    }
  });

  var profileImageStore = new FS.Store.S3('profileImages');
  export const ProfileImages = new FS.Collection('profileImages', {
    stores: [profileImageStore],
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
