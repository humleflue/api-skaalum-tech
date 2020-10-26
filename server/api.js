const path = require(`path`);

const biler = require(`./models/Biler`);
const gettingOverIt = require(`./models/Getting_over_it`);

module.exports = (express, app) => {
  // Speedrun
  app.post(path.join(`api`, `getting-over-it`), (req, res) => gettingOverIt.post(req, res));

  // For testing
  app.get(path.join(`api`, `biler`), (req, res) => biler.get(req, res));
};
