/* eslint no-console: 0 */
const HTTPError = require(`./helper_functions/HTTPError`);

module.exports = (express, app) => {
  // Express will recognize a middleware function with these params, and know it's for error-handling
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (global.conf.log) {
      console.error(`Error (${err.status}): ${err.info}\n${err.stack}`);
    }

    // If the HTTPError module weren't used to throw the error we'll generate a generic error response
    if (err.name !== `HTTPError`) {
      err = new HTTPError(); // eslint-disable-line no-param-reassign
    }

    res.status(err.status).json(err.jsonForUser());
  });
};
