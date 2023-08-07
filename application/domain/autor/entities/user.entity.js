const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ firstName, lastName }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO userinfo (firstname,lastname) VALUES ($1,$2) RETURNING *",
          [firstName,lastName]
        )
        .catch((err) => {
          console.error("MODEL User: Can not create User", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getById(id) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SEELCT * FROM user WHERE id = $1",[id]
        )
        .catch((err) => {
          console.error("MODEL User: Can not get By Id", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};
