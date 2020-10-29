const moment = require(`moment`);

const birthday = moment(`06-09-1996`, `DD-MM-YYYY`);
const info = {
  birthdayISO8601: birthday.format(),
  brithdayFormatted: birthday.format(`dddd, MMMM Do YYYY`),
  age: moment().diff(birthday, `years`),
  firstName: `Lasse`,
  lastName: `Skaalum`,
};

class Me {
  async get(req, res) {
    res.json(info);
  }
}

module.exports = new Me();

