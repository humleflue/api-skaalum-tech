const express = require(`express`);
const app = express();
const port = 3000;
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
const path = require(`path`);

const serve = require(`./server/serveHTML`);
const pad = require(`./server/HelperFunctions/Pad`);

const settings = JSON.parse(fs.readFileSync(`serverSettings.json`));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (settings.debug) {
  app.use(logger);
}
app.use(express.static(path.join(__dirname, `/public/`)));

app.get(`/`, (req, res) => serve(res, `/`));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));

function logger(req, res, next) {
  const reqMethod = pad(req.method, -6, ` `);
  const reqUrl    = `${req.protocol}://${req.get(`host`)}${req.originalUrl}`;
  const now       = new Date();
  const date      = `${pad(now.getDate(), -2, `0`)}/${pad(now.getMonth(), -2, `0`)}/${now.getFullYear()}`;
  const time      = `${pad(now.getHours(), -2, `0`)}:${pad(now.getMinutes(), -2, `0`)}:${pad(now.getSeconds(), -2, `0`)}`;
  console.log(`${date} ${time} - GOT ${reqMethod}: ${reqUrl}`);
  next();
}
