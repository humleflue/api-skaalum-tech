/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`);     // For running the server
const app        = express();
const port       = 3000;
const bodyParser = require(`body-parser`); // For parsing the request. Makes all request data available in req.body
const fs         = require(`fs`);          // For reading/writing files
const path       = require(`path`);        // Used to avoid errors when reffering to a path in the file system
const cors       = require(`cors`);        // Used to enable CORS

/* Internal modules */
const handleRoutes     = require(`./server/routing`);
const handleErrors     = require(`./server/error_handler`);
const mw               = require(`./server/middleware`);
const consoleLogToFile = require(`./server/helper_functions/consol_log_file`);

/* Setup */
consoleLogToFile(); // Modifies the console, such that it logs into the server/logs dir
global.conf = JSON.parse(fs.readFileSync(path.join(__dirname, `server`, `meta`, `server_settings.json`)));

/* Middleware */
if (global.conf.log) {
  app.use(mw.logger);
}
app.use(mw.sendPublicFile);
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routing */
app.use(express.static(`public`)); // Serves all static files (js, css etc.)
handleRoutes(express, app);
handleErrors(express, app);
// Handles non-existing URL-requests. Has to be the last line before app.listen.
app.use((req, res) => res.sendStatus(404));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
