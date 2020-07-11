const express = require(`express`);
const app = express();
const port = 3000;
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
// const path = require(`path`);

const handleRoutes = require(`./server/routing`);
const mw = require(`./server/middle_ware`);

const settings = JSON.parse(fs.readFileSync(`server_settings.json`));

// Middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
if (settings.debug) {
  app.use(mw.logger);
}
app.use(express.static(`public`));

// Handles all routing
handleRoutes(express, app);

// Handles non-existing URL-requests. Has to be the last line before app.listen.
app.use((req, res) => res.status(404).send(`Sorry, the resource doesn't exist`));

app.listen(port, () => console.log(`skaalum-tech listening at http://localhost:${port}`));
