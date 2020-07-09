const express = require(`express`);
const app = express();
const port = 3000;
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
// const path = require(`path`);

const serve = require(`./server/serveHTML`);
const mw = require(`./server/middleWare`);

const settings = JSON.parse(fs.readFileSync(`serverSettings.json`));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
if (settings.debug) {
  app.use(mw.logger);
}
app.use(express.static(`${__dirname}/public`));

// Routing
app.get(`/`, (req, res) => serve(res, `/`));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
