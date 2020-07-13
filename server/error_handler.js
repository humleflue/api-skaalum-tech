/* eslint no-console: 0 */
const fs = require(`fs`);
const path = require(`path`);

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, `meta`, `server_settings.json`)));

module.exports = (express, app) => {
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // The RegEx reads everything until the first colon (or whitespace),
    // because SQL-error-messages looks like this: "ERROR_CODE: Message.... "
    const errType = err.code || /^[^:^ ]+/.exec(err.message)[0];

    if (settings.log) {
      console.error(err.stack);
    }

    const errRes = {
      message: `500: Internal Server Error.`,
      status: 500,
    };

    switch (errType) {
      case `SAMPLE_ERROR`:
        errRes.message = `If this message shows, it means that error handling is working correctly.`;
        errRes.status = 200;
        break;
      default:
        // Defaults to the errRes object with status code 500
        break;
    }

    res.status(errRes.status).json(errRes);
  });
};
