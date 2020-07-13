/* eslint no-console: 0 */

const pad  = require(`./helper_functions/pad`);

class MiddleWare {
  logger(req, res, next) {
    const reqMethod = pad(req.method, -6, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }
}

module.exports = new MiddleWare();
