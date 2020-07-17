/* eslint no-console: 0 */

const path = require(`path`);

const pad  = require(`./helper_functions/pad`);

class Middleware {
  // Logs all incoming requests in the server log
  logger(req, res, next) {
    const clientIP  = global.conf.production ? `${pad(req.headers[`x-real-ip`], 15, ` `)} |` : ``;
    const reqMethod = pad(req.method, -7, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const log       = `${clientIP} GOT ${reqMethod}: ${reqUrl}`;

    console.log(log);
    next();
  }

  // Adds a sendPublicFile()-method to the res-object for easy access to files from the public dir
  sendPublicFile(req, res, next) {
    const publicDir = path.join(__dirname, `..`, `public`);
    res.sendPublicFile = (filePath) => res.sendFile(path.join(publicDir, filePath));
    next();
  }
}

module.exports = new Middleware();
