import "./signup.html";
import "./signup.less";

Template.signup.onRendered(function() {
  $('.ui.signup-form').form({
    fields: {
      firstName: {
        identifier: 'firstName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your first name',
          },
          {
            type: 'regExp[/^[A-Za-z]*$/]',
            prompt: 'First name must contain only letters',
          },
          {
            type: 'minLength[2]',
            prompt: 'First name must be least 2 characters long',
          },
          {
            type: 'maxLength[25]',
            prompt: 'First name must be no more than 25 characters long',
          },
        ],
      },
      lastName: {
        identifier: 'lastName',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your last name',
          },
          {
            type: 'regExp[/^[A-Za-z]*$/]',
            prompt: 'Last name must contain only letters',
          },
          {
            type: 'minLength[2]',
            prompt: 'Last name must be least 2 characters long',
          },
          {
            type: 'maxLength[25]',
            prompt: 'Last name must be no more than 25 characters long',
          },
        ],
      },
      username: {
        identifier: 'username',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter a username',
          },
          {
            type: 'regExp[/^[A-Za-z][A-Za-z0-9_]*$/]',
            prompt: 'Usernname must contain only alphanumeric characters',
          },
          {
            type: 'minLength[3]',
            prompt: 'Username must be least 2 characters long',
          },
          {
            type: 'maxLength[15]',
            prompt: 'Username must be no more than 15 characters long',
          },
        ],
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'email',
            prompt: 'Please enter a valid email address',
          },
        ],
      },
      confirmPassword: {
        identifier: 'confirmPassword',
        rules: [
          {
            type: 'match[password]',
            prompt: 'Does not match password',
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

Template.signup.events({
  'submit form.signup-form'(event, template) {
    event.preventDefault();

    let firstName = template.$('[name=firstName]').val().trim();
    let lastName = template.$('[name=lastName]').val().trim();
    let username = template.$('[name=username]').val().trim();
    let email = template.$('[name=email]').val().trim();
    let password = template.$('[name=password]').val().trim();
    let confirmPassword = template.$('[name=confirmPassword]').val().trim();

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        firstName: firstName,
        lastName: lastName,
        username: username,
      },
    }, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('homePage');
      }
    });
  },
});
