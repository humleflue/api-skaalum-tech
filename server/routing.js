module.exports = (express, app) => {
  app.get(`/`, (req, res) => res.sendPublicFile(`index.html`));

  // For testing error handling
  app.get(`/error`, () => {
    throw new Error(`SAMPLE_ERROR: This is an intended error, for when the client is accessing the '/error' URL`);
  });
};
