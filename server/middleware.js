/* eslint no-console: 0 */

const pad  = require(`./helper_functions/pad`);

class Middleware {
  logger(req, res, next) {
    const clientIP  = global.settings.production ? `(${req.headers[`X-Real-IP`]})` : ``;
    const reqMethod = pad(req.method, -7, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${clientIP} GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }
}

module.exports = new Middleware();
