const mysql = require(`mysql`);
const settings = require(`../../server_settings`); // FIXME: global.conf is undefined

// Initialize pool
const pool = mysql.createPool(settings.dbconfig);

exports.executeQuery = (query, callback) => {
  pool.getConnection((err, connection) =>  {
    if (err) {
      connection.release();
      throw err;
    }
    connection.query(query, (error, rows) =>  {
      connection.release();
      if (!error) {
        callback(null, { rows });
      }
    });
    connection.on(`error`, (error) => {
      throw error;
    });
  });
};

module.exports = pool;
