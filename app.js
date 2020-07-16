/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`);
const app        = express();
const port       = 3000;
const bodyParser = require(`body-parser`);
const fs         = require(`fs`);
const path       = require(`path`);
const cors       = require(`cors`);

/* Internal modules */
const handleRoutes     = require(`./server/routing`);
const handleErrors     = require(`./server/error_handler`);
const mw               = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helper_functions/consol_log_file`);

/* Setup */
consoleLogToFile(); // Modifies the console, such that it logs into the server/logs dir
global.settings = JSON.parse(fs.readFileSync(path.join(__dirname, `server`, `meta`, `server_settings.json`)));

/* Middleware */
if (global.settings.log) {
  app.use(mw.logger);
}
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`public`));

/* Routing */
handleRoutes(express, app);
handleErrors(express, app);
// Handles non-existing URL-requests. Has to be the last line before app.listen.
app.use((req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
