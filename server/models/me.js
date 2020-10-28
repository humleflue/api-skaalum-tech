const moment = require(`moment`);

const info = {
  birthday: moment(`1996-06-09`),
  firstName: `Lasse`,
  lastName: `Skaalum`,
};

class Me {
  async get(req, res) {
    res.json(info);
  }
}

module.exports = new Me();
