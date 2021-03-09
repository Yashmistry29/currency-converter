export default function validateSignup(values) {
  let errors = {};

  //Name Errors
  if (!values.name) {
    errors.name = "A username is required.";
  }
  // Email Errors
  if (!values.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Your email is invalid.";
  }
  // Password Errors
  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Your password must be at least 6 characters.";
  }

  //mobile errors
  if(!values.mobile){
    errors.mobile="Mobile is required.";
  }else if(values.mobile.length<10 || values.mobile.length>10){
    errors.mobile="Check your Mobile no."
  }

  return errors;
}
