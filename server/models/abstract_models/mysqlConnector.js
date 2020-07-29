/* eslint no-console: 0 */

const mysql      = require(`mysql2`);
const { Client } = require(`ssh2`);
const camelCase  = require(`camelcase`);

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

async function getSqlConf() {
  return new Promise((resolve, reject) =>  {
    if (global.conf.production) {
      resolve(global.conf.sqlConf);
    }
    else {
      const ssh = new Client();
      ssh.on(`ready`, () => {
        ssh.forwardOut(
          `127.0.0.1`,
          12345,
          `127.0.0.1`,
          3306,
          (sshErr, stream) => {
            if (sshErr) {
              console.error(`forwardOut (ssh) Error`);
              reject(sshErr);
            }
            //   console.log(`forwardOut: ready!`);
            const { sqlConf } = global.conf;
            sqlConf.stream = stream;
            resolve(sqlConf);
          },
        );
      }).connect(global.conf.sshConf);
    }
  });
}

module.exports = Database;
