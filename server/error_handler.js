/* eslint no-console: 0 */

const fs = require(`fs`);

const settings = JSON.parse(fs.readFileSync(`server_settings.json`));

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    let response = {};
    let statusCode = 500;
    // The RegEx reads everything until the first colon (or whitespace) because SQL-error-messages looks like this: "ERROR_CODE: Bla bla.... "
    const errorType = err.code || /^[^:^ ]+/.exec(err.message)[0];

    if (settings.debug) {
      console.error(err);
    }
    console.log(errorType);

    switch (errorType) {
      case `SAMPLE_ERROR`:
        response.msg = `If this message shows, it means that error handling is working correctly.`;
        statusCode = 200;
        break;
      default:
        response = `500: Internal Server Error.`;
        break;
    }

    res.status(statusCode).json(response);
  });
};
