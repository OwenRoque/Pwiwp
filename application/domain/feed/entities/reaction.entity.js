const connectionDb = require("../../../config/dbconnections");
module.exports = {
  async create(idpublication, user_id ) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
      const data = await connection
        .query(
          "INSERT INTO reaction (idpublication, user_id) VALUES ($1, $2) RETURNING *",
          [idpublication, user_id]
        )
        .catch((err) => {
          console.error("Can not create Reaction", err);
          return null;
        });
      connection.end();
  
      if (data && data.rows && data.rows.length > 0) {
        return resolve(data.rows[0]);
      }
  
      return reject(null);
    });
  },
  async delete(idpublication, user_id) {
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
  
      try {
        // Verificar si existe un registro con la combinación de idpublication y user_id
        const existingReaction = await connection.query(
          "SELECT * FROM reaction WHERE idpublication = $1 AND user_id = $2",
          [idpublication, user_id]
        );
  
        if (existingReaction.rows.length > 0) {
          // Si existe un registro, eliminarlo
          const deletedReaction = await connection.query(
            "DELETE FROM reaction WHERE idpublication = $1 AND user_id = $2 RETURNING *",
            [idpublication, user_id]
          );
          connection.end();
          resolve(deletedReaction.rows[0]);
        } else {
          // Si no existe un registro con la combinación dada, no hay nada que eliminar
          connection.end();
          resolve(null);
        }
      } catch (err) {
        console.error("Error while deleting reaction", err);
        connection.end();
        reject(null);
      }
    });
  },
  
  async count(idpublication) {
    console.log('id',idpublication)
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
  
      try {
        // Contar la cantidad de registros con el idpublication dado
        const result = await connection.query(
          "SELECT COUNT(*) AS count FROM reaction WHERE idpublication = $1",
          [idpublication]
        );
        //console.log('result.rows.length',result.rows.length)
        //console.log('result.rows[0].count',result.rows[0].count)
        // El resultado de la consulta contiene una propiedad "rows" que tiene la cantidad total
        const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].count) : 0;
        //console.log('totalCount',totalCount)
        connection.end();
        resolve(totalCount);
      } catch (err) {
        //console.error("Error while counting reactions", err);
        connection.end();
        reject(null);
      }
    });
  },
  async countReactionByUser(idpublication, iduser) {
    console.log('idpublication:',idpublication)
    console.log('iduser:',iduser)
    return new Promise(async (resolve, reject) => {
      const connection = connectionDb();
  
      try {
        // Contar la cantidad de registros con el idpublication dado
        const result = await connection.query(
          "SELECT COUNT(*) AS count FROM reaction WHERE idpublication = $1 AND user_id = $2",
          [idpublication, iduser]
        );
  
        // El resultado de la consulta contiene una propiedad "rows" que tiene la cantidad total
        const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].count) : 0;
  
        connection.end();
        console.log('totalCount',totalCount)
        resolve(totalCount);
      } catch (err) {
        console.error("Error while counting reactions", err);
        connection.end();
        reject(null);
      }
    });
  },
};
