/* eslint no-console: 0 */

const rimraf = require(`rimraf`);
const path = require(`path`);

// Removes all .log files in this directory
rimraf(path.join(__dirname, `server`, `logs`, `*.log`), (err) => {
  if (err) {
    throw err;
  }
  console.log(`Logs removed successfully.`);
});
