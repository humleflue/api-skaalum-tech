const { Client } = require(`ssh2`);

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

module.exports = getSqlConf;
