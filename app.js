/* eslint no-console: 0 */

/* External modules */
const express    = require(`express`);       // For running the server
const app        = express();                // For running the server
const port       = 3001;                     // Server port number
const bodyParser = require(`body-parser`);   // For parsing the request. Makes all request data available in req.body
// const path       = require(`path`);          // Used to avoid errors when reffering to a path in the file system
const cors       = require(`cors`);          // Used to enable CORS
const morgan     = require(`morgan`);        // Used to log all info about client from the request
require(`express-async-errors`);             // With this we don't have to pass errors like next(err) but can just throw'em instead

/* Internal modules */
const handleRoutes         = require(`./server/routing`);
const handleErrors         = require(`./server/error_handler`);
const mw                   = require(`./server/middleware`);
const consoleLogToFile     = require(`./server/helpers/consol_log_file`);

/* Setup */
global.conf = require(`./server_settings`); // Load settings into grobal variable (available across all scripts)
consoleLogToFile(); // Modifies the console, such that it writes logs into the server/logs dir

/* Middleware */
app.use(mw.requestValidator);
if (global.conf.log) {
  app.use(mw.logger); // Logs requests to console
}
app.use(morgan(`combined`, { stream: mw.getLogWriteStream() })); // Logs all info about client from the request
app.use(cors({ credentials: true, origin: true }));              // Enables CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Routing */
handleRoutes(express, app);
handleErrors(express, app);
app.use((req, res) => res.sendStatus(404)); // Handles non-existing URI-requests. Has to be the last line before app.listen.

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
