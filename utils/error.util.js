export const createError = (status, message, description, severity) => {
  const err = new Error();

  err.status = status;
  err.message = message;
  err.description = description;
  err.severity = severity;

  return err;
};
