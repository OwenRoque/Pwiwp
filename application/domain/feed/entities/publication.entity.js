const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create({ content,id }) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO publication (content,date,user_id) VALUES ($1,$2,$3) RETURNING *",
          [content,new Date(),id]
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not create Publication", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getPublicationById(id) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM publication WHERE id = $1",[id]
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not get By Id", err);
          return null;
        });
      connection.end();
      if (data && data.rows && data.rows.length > 0)
        return resolve(data.rows[0]);
      return reject(null);
    });
  },
  async getPublicationsByUserId(id) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM publication WHERE user_id = $1",[id]
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not get By User id", err);
          return null;
        });
      connection.end();
      if (data && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
  async getPublications() {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "SELECT * FROM publication ORDER BY id DESC"
        )
        .catch((err) => {
          console.error("MODEL Publication: Can not get By User id", err);
          return null;
        });
      connection.end();
      if (data && data.rows)
        return resolve(data.rows);
      return reject(null);
    });
  },
};
