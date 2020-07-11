const fs = require(`fs`);

const pad = require(`./helper_functions/pad`);

class MiddleWare {
  logger(req, res, next) {
    const reqMethod = pad(req.method, -6, ` `);
    const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
    const now       = new Date();
    const date      = `${pad(now.getDate(), -2, `0`)}/${pad(now.getMonth(), -2, `0`)}/${now.getFullYear()}`;
    const time      = `${pad(now.getHours(), -2, `0`)}:${pad(now.getMinutes(), -2, `0`)}:${pad(now.getSeconds(), -2, `0`)}`;
    const log       = `${date} ${time} - GOT ${reqMethod}: ${reqUrl}`;
    console.log(log);
    fs.appendFile(`${__dirname}/logs/${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.log`, `${log}\n`, (err) => {
      if (err) {
        throw err;
      }
    });
    next();
  }
}

module.exports = new MiddleWare();
