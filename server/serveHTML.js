const path = require(`path`);

module.exports = (res, route) => {
  const root = path.join(__dirname, `../`);

  switch (route) {
    case `/`:
      return res.sendFile(path.join(root, `/public/index.html`));
    default:
      return res.sendStatus(404);
  }
};
