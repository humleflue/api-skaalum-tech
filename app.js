/* eslint no-console: 0 */

// External modules
const express = require(`express`);
const app = express();
const port = 3000;
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
const path = require(`path`);

// Internal modules
const handleRoutes = require(`./server/routing`);
const handleErrors = require(`./server/error_handler`);
const mw = require(`./server/middleware`);

const settings = JSON.parse(fs.readFileSync(path.join(__dirname, `server`, `server_settings.json`)));

// Middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
if (settings.debug) {
  app.use(mw.logger);
}
app.use(express.static(`public`));

handleRoutes(express, app);
handleErrors(express, app);
// Handles non-existing URL-requests. Has to be the last line before app.listen.
app.use((req, res) => res.status(404).send(`Sorry, the resource doesn't exist`));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
