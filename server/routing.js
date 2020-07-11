const path = require(`path`);

module.exports = (express, app) => {
  const root = path.join(__dirname, `..`); // root dir is the parent of the "server"-folder

  app.get(`/`, (req, res) => res.sendFile(path.join(root, `/public/index.html`)));
  app.get(`/hej`, (req, res) => {
    throw new Error(`Hejsa dejsa`);
  });
};
