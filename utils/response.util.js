export const createResponse = (
  status,
  message,
  description,
  severity,
  data
) => {
  const response = {};

  response.status = status;
  response.message = message;
  response.description = description;
  response.severity = severity;
  response.data = data;

  return response;
};
