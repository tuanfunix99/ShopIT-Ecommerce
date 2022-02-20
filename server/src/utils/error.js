const { Error } = require('mongoose');

exports.errorValidation = (path, message) => {
  let error = new Error.ValidationError();
  error.errors[path] = new Error.ValidatorError({
    message: message,
    path: path,
  });
  return error;
};

exports.handleValidationError = (error, errors) => {
  for (const property in error.errors) {
    if (error.errors[property].kind === "unique") {
      continue;
    }
    errors[property] = error.errors[property].message;
  }
  return errors;
};

exports.handleMongoServerErrorUnique = (error, errors) => {
  const property = Object.keys(error.keyPattern)[0];
  errors[property] = `${property} is already taken`;
  return errors;
};
