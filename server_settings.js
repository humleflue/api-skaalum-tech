const settings = {
  log: true,
  logErrors: false,
  production: false,
  dbconfig: {}, // We'll fill this in later
};

if (settings.production) {
  settings.dbconfig = {
    connectionLimit: 10,
    host: `localhost`,
    username: `admin`,
    password: `Skaalumdatababs`,
    database: `biler`,
  };
}
else {
  settings.dbconfig = { // FIXME: Doesn't work
    connectionLimit: 10,
    host: `localhost`,
    username: `admin`,
    password: `Skaalumdatababs`,
    database: `biler`,
  };
}

module.exports = settings;
