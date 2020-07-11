const fs = require(`fs`);

const settings = JSON.parse(fs.readFileSync(`server_settings.json`));

module.exports = (err, express, app) => {
  if (settings.debug) {
    console.log(`I get here`);
    console.log(err);
  }
  app.status(400).send(`400: Bad request.`);
};
