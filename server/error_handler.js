/* eslint no-console: 0 */

const fs = require(`fs`);
const path = require(`path`);

// const root = path.join(__dirname, `..`);
const settings = JSON.parse(fs.readFileSync(path.join(__dirname, `server_settings.json`)));

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // The RegEx reads everything until the first colon (or whitespace),
    // because SQL-error-messages looks like this: "ERROR_CODE: Message.... "
    const errorType = err.code || /^[^:^ ]+/.exec(err.message)[0];

    if (settings.debug) {
      console.error(err);
    }

    const response = {
      message: `500: Internal Server Error.`,
      status: 500,
    };

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
