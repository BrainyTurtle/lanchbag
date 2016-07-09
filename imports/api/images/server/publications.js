import { PostImages } from '../images.js';
import { ProfileImages } from '../images.js';

Meteor.publish('images.all', () => {
  return PostImages.find();
});

Meteor.publish('images.limit', (limit) => {
  check(limit, Number);
  return PostImages.find({}, {limit: limit});
});

Meteor.publish('images.one', (imageId) => {
  check(imageId, String);
  return PostImages.find(imageId);
});




Meteor.publish('profileImages.all', () => {
  return ProfileImages.find();
});

Meteor.publish('profileImages.one', (imageId) => {
  check(imageId, String);
  return ProfileImages.find(imageId);
});
