/* eslint no-console: 0 */

const fs = require(`fs`);

const settings = JSON.parse(fs.readFileSync(`server_settings.json`));

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (settings.debug) {
      console.error(err);
    }

    const response = {
      message: `500: Internal Server Error.`,
      status: 500,
    };

    // The RegEx reads everything until the first colon (or whitespace) because SQL-error-messages looks like this: "ERROR_CODE: Bla bla.... "
    const errorType = err.code || /^[^:^ ]+/.exec(err.message)[0];
    switch (errorType) {
      case `SAMPLE_ERROR`:
        response.message = `If this message shows, it means that error handling is working correctly.`;
        response.status = 200;
        break;
      default: break;
    }

    res.status(response.status).json(response);
  });
};
