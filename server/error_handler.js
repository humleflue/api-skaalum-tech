/* eslint no-console: 0 */

module.exports = (express, app) => {
  // Express will recognize a middleware function with these params, and know it's for error-handling
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // The RegEx reads everything until the first colon (or whitespace),
    // because SQL-error-messages looks like this: "ERROR_CODE: Message.... "
    const errType = err.code || /^[^:^ ]+/.exec(err.message)[0];

    if (global.conf.log) {
      // We don't want the huge err.stack-message when testing error handling (test by accessing '/error' URL)
      const log = errType === `SAMPLE_ERROR` ? err : err.stack;
      console.error(log);
    }

    // Default error for when something unexprected happens - should be modified in the switch for better user experience
    const errRes = {
      message: `Sorry, something went wrong. Please try again later.\n`
             + `If the problem persists please contact support with error code 42`,
      status: 500, // Internal Server Error
      error: true, // Handy on the front-end. Intended usage: if(res.error) {...}
    };

    // Alter the errRes object here in the switch cases
    switch (errType) {
      case `SAMPLE_ERROR`: // Is an intended error. Happens when the client is accessing the 'error' URL
        errRes.message = `If this message shows, it means that error handling is working correctly.`;
        errRes.status = 200; // OK
        break;
      default:
        // Defaults to the errRes object with status code 500
        break;
    }

    res.status(errRes.status).json(errRes);
  });
};
