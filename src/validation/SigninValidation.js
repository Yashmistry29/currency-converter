const validateSignin = (inputs) => {
  let errors = {};

  // Email Errors
  if (!inputs.email) {
    errors.email = "Your email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputs.email)) {
    errors.email = "Your email is invalid.";
  }
  // Password Errors
  if (!inputs.password) {
    errors.password = "A password is required.";
  } else if (inputs.password.length < 6) {
    errors.password = "Your password must be at least 6 characters.";
  }

  return errors;
}
export default validateSignin;