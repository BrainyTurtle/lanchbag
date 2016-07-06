import "./signup.html";
import "./signup.less";

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
