const path = require(`path`);

module.exports = (express, app) => {
  const publicDir = path.join(__dirname, `..`, `public`);

  app.get(`/`, (req, res) => res.sendFile(path.join(publicDir, `index.html`)));

  // For testing error handling
  app.get(`/error`, () => {
    throw new Error(`SAMPLE_ERROR: This is an intended error, for when the client is accessing the '/error' URL`);
  });
};
