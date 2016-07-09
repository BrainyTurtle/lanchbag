import { PostImages } from '../images.js';

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
