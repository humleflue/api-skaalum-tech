const HTTPError = require(`./helper_functions/HTTPError`);

module.exports = (express, app) => {
  // For testing error handling
  app.get(`/error`, () => {
    throw new HTTPError(200,
      `Intended error for testing error-handling`,
      `If this message shows, it means that error handling is working correctly.`);
  });
};
