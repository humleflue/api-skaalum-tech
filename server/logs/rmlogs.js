/* eslint no-console: 0 */

const rimraf = require(`rimraf`);
const path = require(`path`);

rimraf(path.join(__dirname, `*.log`), (err) => {
  if (err) {
    throw err;
  }
  console.log(`Logs removed successfully.`);
});
