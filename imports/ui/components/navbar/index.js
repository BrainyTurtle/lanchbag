import './navbar.html';
import './navbar.less';

/* ================ Navbar template ============= */

Template.navbar.events({
  'click .logout'(event, template) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },
  'click a.signin'(event, template) {
    event.preventDefault();
    $('.signin-modal').modal('show');
  },
  'click a.my-profile-link'(event, template) {
    event.preventDefault();
    Router.go('profilePage', {profileUserId: Meteor.userId()});
  },
});

/* ========= Signin modal body template ========= */

Template.signin.onRendered(function() {
  $('.ui.signin-form').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'email',
            prompt: 'Please enter a valid email address',
          },
        ],
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a password',
          },
        ],
      },
    },
    inline: true,
    on: 'blur',
  });
});

Template.signin.events({
  //TODO (mronfim): Enable user to login with username OR email address
  'submit form.signin-form'(event, template) {
    event.preventDefault();

    let email = template.$('[name=email]').val().trim();
    let password = template.$('[name=password]').val().trim();

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        $('.signin-modal').modal('hide');
        Router.go("homePage");
      }
    });
  },
});

/* ========= User navbar dropdown template ========= */

Template.userNavbarDropdown.onRendered(function() {
  $('.ui.dropdown').dropdown();
});
