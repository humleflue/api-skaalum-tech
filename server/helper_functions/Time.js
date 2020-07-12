const pad = require(`./pad`);

class Time {
  constructor(date) {
    this.date = date;
    this.slashDate = `${pad(date.getDate(), -2, `0`)}/${pad(date.getMonth() + 1, -2, `0`)}/${date.getFullYear()}`;
    this.colonTime = `${pad(date.getHours(), -2, `0`)}:${pad(date.getMinutes(), -2, `0`)}:${pad(date.getSeconds(), -2, `0`)}`;
  }

  update(date) {
    this.constructor(date);
  }
}

module.exports = Time;
