/* eslint no-console: 0 */

const mysql      = require(`mysql2`);
const camelCase  = require(`camelcase`);

const getSqlConf = require(`../../helpers/getSqlConf`);

class Database {
  async query(queryString) {
    return new Promise((resolve, reject) => {
      getSqlConf()
        .then((sqlConf) => {
          const connection = mysql.createConnection(sqlConf);
          connection.connect((err) => {
            if (err) {
              console.error(`Error connecting`);
              reject(err);
            }
          });
          connection.query(queryString, (err, results) => {
            if (err) {
              console.log(`Error while querying the database`);
              reject(err);
            }
            else {
              resolve(this.parse(results));
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  parse(arrayOfObjects) {
    const res = [];
    arrayOfObjects.forEach((obj) => {
      const parsedObj = {};
      Object.keys(obj).forEach((key) => {
        parsedObj[camelCase(key)] = obj[key];
      });
      res.push(parsedObj);
    });
    return res;
  }
}

module.exports = Database;
