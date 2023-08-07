const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ email, password, user_id, nickname }) {
    return new Promise(async (resolve, reject) => {
      const bcrypt = require("bcryptjs");
      password = bcrypt.hashSync(password, 8);
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO account (email,password,user_id,nickname) VALUES ($1,$2,$3,$4) RETURNING *",
          [email, password, user_id, nickname]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not create Account", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getByEmail(email) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT a.email,a.password,a.user_id,a.nickname FROM account a INNER JOIN userinfo u ON a.user_id = u.id WHERE a.email = $1",[email]
        )
        .catch((err) => {
          console.error("MODEL Account: Can not get By Email", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
};
