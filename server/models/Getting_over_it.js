const Database = require(`./abstract_models/Database`);

class GettingOverIt extends Database {
  constructor() {
    super();
    this.table = `getting_over_it`;
  }

  async get(req, res) {
    const allRuns = await this.query(`SELECT * FROM ${this.table}`);
    res.json(allRuns);
  }

  async post(req, res) {
    console.log(req.body.player);
    res.sendStatus(200);
  }
}

module.exports = new GettingOverIt();
