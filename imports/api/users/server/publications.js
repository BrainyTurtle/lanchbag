Meteor.publish('users.all', function() {
  return Meteor.users.find();
});

Meteor.publish('users.one', function(userId) {
  check(userId, String);
  return Meteor.users.find({
    $or: [
      {_id: userId},
      {"profile.username": userId},
    ],
  });
});
