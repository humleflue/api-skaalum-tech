/* eslint no-console: 0 */

// External modules
const express    = require(`express`);
const app        = express();
const port       = 3000;
const bodyParser = require(`body-parser`);
const fs         = require(`fs`);
const path       = require(`path`);

// Internal modules
const handleRoutes     = require(`./server/routing`);
const handleErrors     = require(`./server/error_handler`);
const mw               = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helper_functions/consol_log_file`);

// Setup
consoleLogToFile(); // Modifies the console, such that it logs into the server/logs dir
const settings = JSON.parse(fs.readFileSync(path.join(__dirname, `server`, `meta`, `server_settings.json`)));

// Middleware
if (settings.log) {
  app.use(mw.logger);
}
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

// Routing
handleRoutes(express, app);
handleErrors(express, app);
// Handles non-existing URL-requests. Has to be the last line before app.listen.
app.use((req, res) => res.status(404).send(`404: Sorry, that resource doesn't exist`));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
