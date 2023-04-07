export const createResponse = (status, message, description, severity) => {
  const response = {};

  response.status = status;
  response.message = message;
  response.description = description;
  response.severity = severity;

  return response;
};
