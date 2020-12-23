const moment = require(`moment`);

const Shield = require(`./shield`);

const birthday = moment(`06-09-1996`, `DD-MM-YYYY`);

const firstName = `Lasse`;
const middleName = `Damsgaard`;
const lastName = `Skaalum`;
const fullName = `${firstName} ${middleName} ${lastName}`;

const occupation = {
  name: `Software Engineering Student`,
  place: `Aalborg University`,
};

const country = `Denmark`;
const city = `Aalborg`;

class Badges {
  name(req, res) {
    const badge = new Shield(`name`, fullName, `green`);
    res.json(badge);
  }

  age(req, res) {
    const badge = new Shield(`age`, moment().diff(birthday, `years`), `green`);
    res.json(badge);
  }

  occupation(req, res) {
    const badge = new Shield(`occupation`, occupation.name, `yellow`);
    res.json(badge);
  }

  placeOfOccupation(req, res) {
    const badge = new Shield(`place of occupation`, occupation.place, `yellow`);
    res.json(badge);
  }

  country(req, res) {
    const badge = new Shield(`country`, country, `blue`);
    res.json(badge);
  }

  city(req, res) {
    const badge = new Shield(`city`, city, `blue`);
    res.json(badge);
  }
}

module.exports = new Badges();
