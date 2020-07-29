/* eslint no-console: 0 */

const mysql = require(`mysql2`);
const { Client } = require(`ssh2`);
const ssh = new Client();

module.exports = (query) => new Promise((resolve, reject) =>  {
  if (global.conf.production) {
    const connection = mysql.createConnection(global.conf.sqlConf);
    connection.query(query, (error, results) => { // Thrid param: fields
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  }
  else {
    ssh.on(`ready`, () => {
      ssh.forwardOut(
        `127.0.0.1`,
        12345,
        `127.0.0.1`,
        3306,
        (err, stream) => {
          if (err) {
            console.error(`forwardOut Error: ${err}`);
            reject(err);
          }
          //   console.log(`forwardOut: ready!`);
          const { sqlConf } = global.conf;
          sqlConf.stream = stream;
          const connection = mysql.createConnection(sqlConf);
          connection.connect((error) => {
            if (error) {
              console.error(`error connecting: ${error.stack}`);
              reject(error);
            }
          });
          connection.query(query, (error, results) => {
            if (err) {
              console.log(`Error while querying the database`);
              console.error(error);
              reject(error);
            }
            resolve(results);
          });
        },
      );
    }).connect(global.conf.sshConf);
  }
});
