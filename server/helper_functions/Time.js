const pad = require(`./pad`);
const padZero = (str) => pad(str, -2, `0`);

class Time {
  constructor(date = new Date()) { // Assigns date to the present time by default
    this.fullDate = date;
    this.date = date.getDate();
    this.month = date.getMonth() + 1; // +1 is necessary to get the right month
    this.year = date.getFullYear();

    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();

    this.slashDate = `${padZero(this.date)}/${padZero(this.month)}/${this.year}`;
    this.dashUSDate = `${this.year}-${this.month}-${this.date}`;

    this.colonTime = `${padZero(this.hours)}:${padZero(this.minutes)}:${padZero(this.seconds)}`;
  }

  update(date = new Date()) {
    this.constructor(date);
  }
}

module.exports = Time;
