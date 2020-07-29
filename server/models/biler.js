const query = require(`./mysqlConnector`);
// const HTTPError = require(`../helpers/HTTPError`);

// const settings = require(`../../server_settings`); // FIXME: global.conf is undefined

class Biler {
  async get(req, res) {
    const bil = await query(`SELECT * FROM biler`);
    res.json(bil);
  }
}

module.exports = new Biler();
