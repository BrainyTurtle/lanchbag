if (typeof Schema === 'undefined') {
  Schema = function Schema() {}
}

Schema.UserProfile = new SimpleSchema({
  firstName: {
    type: String,
    label: 'First Name',
    regEx: /^[a-zA-Z]{2,25}$/,
  },
  lastName: {
    type: String,
    label: 'First Name',
    regEx: /^[a-zA-Z]{2,25}$/,
  },
  username: {
    type: String,
    label: 'Username',
    regEx: /^[A-Za-z][A-Za-z0-9_]*$/,
    unique: true,
    min: 3,
    max: 15,
    autoValue: function () {
      if (this.isSet && typeof this.value === 'string') {
        return this.value.toLowerCase();
      }
    },
  },
});

Schema.user = new SimpleSchema({
  emails: {
    type: [Object],
    optional: true,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  "emails.$.verified": {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  profile: {
    type: Schema.UserProfile,
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
});

Meteor.users.attachSchema(Schema.user);
