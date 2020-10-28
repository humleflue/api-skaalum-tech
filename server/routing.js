// const path = require(`path`);

// const HTTPError = require(`./helpers/HTTPError`);

const checkDatabaseConnection = require(`./models/checkDatabaseConnection`);

const biler = require(`./models/biler`);
const me    = require(`./models/me`);

module.exports = (express, app) => {
  app.get(`/`, (req, res) => checkDatabaseConnection(req, res));

  app.get(`/biler`, (req, res) => biler.get(req, res));
  app.get(`/me`, (req, res) => me.get(req, res));
};
