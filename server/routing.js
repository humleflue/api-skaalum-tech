const path = require(`path`);

const HTTPError = require(`./helper_functions/HTTPError`);

module.exports = (express, app) => {
  const publicDir = path.join(__dirname, `..`, `public`);

  // For testing error handling
  app.get(`/error`, (req, res) => res.sendFile(path.join(publicDir, `error.html`)));
  app.get(`/error/intended`, () => {
    throw new HTTPError(200,
      `Intended error for testing error-handling`,
      `If this message shows, it means that error handling is working correctly.`);
  });
  app.get(`/error/unintended`, () => {
    throw new Error(`Intended error for testing handling of unintended errors`);
  });
};
