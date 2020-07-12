/* eslint no-console: 0 */

const rimraf = require(`rimraf`);
const path = require(`path`);

const logPath = path.join(__dirname, `server`, `logs`);

// Removes all .log files in this directory
console.log(`Removing log files at path: "${logPath}"`);
rimraf(path.join(logPath, `*.log`), (err) => {
  if (err) {
    throw err;
  }
  console.log(`Logs removed successfully.`);
});
