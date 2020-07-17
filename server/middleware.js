/* eslint no-console: 0 */

const path   = require(`path`);
const fs     = require(`fs`);

const pad  = require(`./helper_functions/pad`);
const Time = require(`./helper_functions/Time`);

class Middleware {
  // Logs all incoming requests in the server log
  logger(req, res, next) {
    const clientIP  = global.conf.production ? `${pad(req.headers[`x-real-ip`], 15, ` `)} | ` : ``;
    const reqMethod = pad(req.method, -7, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${clientIP}GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }

  // Get's the log-stream for the morgan-modules
  getAccessLogStream() {
    const time = new Time();
    // create a write stream (in append mode)
    const accessLogStream = fs.createWriteStream(path.join(__dirname, `logs`, `${time.dashDateUS}-full.log`), { flags: `a` });
    return accessLogStream;
  }
}

module.exports = new Middleware();
