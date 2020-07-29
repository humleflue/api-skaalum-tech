const mysql = require(`./mysqlConnector`);

class Biler {
  get() {
    mysql.executeQuery(`SELECT * FROM biler.biler`);
  }
}

module.exports = new Biler();
