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
              resolve(parse(results));
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

async function getSqlConf() {
  return new Promise((resolve, reject) =>  {
    const { sqlConf } = global.conf;

    if (global.conf.production) {
      resolve(sqlConf);
    }
    else { // If we're in development mode we need to ssh into the server first
      const ssh = new Client();
      ssh.on(`ready`, () => {
        ssh.forwardOut(
          `127.0.0.1`, // Doesn't matter
          12345,       // Doesn't matter
          `127.0.0.1`, // Database IP on server
          3306,        // Database port on server
          (err, stream) => {
            if (err) {
              console.error(`forwardOut (ssh) Error`);
              reject(err);
            }
            else {
              sqlConf.stream = stream;
              resolve(sqlConf);
            }
          },
        );
      }).connect(global.conf.sshConf);
    }
  });
}

function parse(arrayOfObjects) {
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

module.exports = Database;
