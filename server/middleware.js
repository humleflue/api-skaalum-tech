/* eslint no-console: 0 */

const pad = require(`./helper_functions/pad`);
const Time = require(`./helper_functions/Time`);

class MiddleWare {
  logger(req, res, next) {
    const reqMethod = pad(req.method, -6, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const time      = new Time(new Date());
    const log       = `${time.slashDate} ${time.colonTime} - GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }
}

module.exports = new MiddleWare();
