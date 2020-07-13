/* eslint no-console: 0 */

const pad  = require(`./helper_functions/pad`);

class Middleware {
  logger(req, res, next) {
    req.clientIp = next.settings.production ? `${req.headers[`X-Forwarded-For`]} | ` : ``;
    const reqMethod = pad(req.method, -6, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${req.clientIp}GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }
}

module.exports = new Middleware();
