const moment = require(`moment`);

const birthday = moment(`06-09-1996`, `DD-MM-YYYY`);
const firstName = `Lasse`;
const middleName = `Damsgaard`;
const lastName = `Skaalum`;

const info = {
  // birthdayISO8601: birthday.format(),
  // brithdayFormatted: birthday.format(`dddd, MMMM Do YYYY`),
  age: moment().diff(birthday, `years`),
  firstName,
  middleName,
  lastName,
  fullName: `${firstName} ${middleName} ${lastName}`,
  country: `Denmark`,
  city: `Aalborg`,
  occupation: `Software Engineering Student`,
  placeOfOccupation: `Aalborg University`,
};

class Me {
  async get(req, res) {
    res.json(info);
  }
}

module.exports = new Me();
