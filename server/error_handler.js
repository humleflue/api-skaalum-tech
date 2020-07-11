/* eslint no-console: 0 */

const fs = require(`fs`);
const path = require(`path`);

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, `server_settings.json`)));

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
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
    if (settings.debug) {
      console.error(err);
      if (errorType !== `SAMPLE_ERROR`) {
        logError(err);
      }
    }

    res.status(response.status).json(response);
  });
};

function logError(err) {
  const now = new Date();
  fs.appendFile(path.join(__dirname, `logs`, `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}_errors.log`), `${err}\n`, (error) => {
    if (error) {
      throw error;
    }
  });
}
