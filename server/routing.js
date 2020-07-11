const path = require(`path`);

module.exports = (express, app) => {
  const root = path.join(__dirname, `..`); // root dir is the parent of the "server"-folder

  app.get(`/`, (req, res) => res.sendFile(path.join(root, `/public/index.html`)));

  // For testing error handling
  app.get(`/error`, () => {
    throw new Error(`SAMPLE_ERROR: This is an intended error, for when the client is accessing the '/error' URL`);
  });
};
