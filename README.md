# Red Social PWIWP

## Descripción
En este fork se estará trabajando sobre las funcionalidades respecto a las reacciones a publicaciones

## Tablero de Trello
Puede seguir el progreso y planificación en [Tablero de Trello](https://trello.com/invite/b/niJLByP0/ATTI9e7870e3d9960cbf216433993eeebb357FFF3A43/pwiwp-tablero).

## Estilos de Programación

### Estilo 1: Aspect
+ El problema se descompone utilizando alguna forma de abstracción (procedimientos, funciones, objetos, etc.)
+ Los aspectos del problema se agregan al programa principal sin editar el código fuente de las abstracciones. Estas funciones secundarias se aferran a las abstracciones principales nombrándolas, como en "Soy un aspecto de foo (¡aunque puede que foo no lo sepa!)".

```javascript
class FeedService {
  static async PublishPublication(data) {
    const publicationEntity = require("../entities/publication.entity");
    const userResponse = await publicationEntity.create(data).catch((e) => {
      console.error("SERVICE ACCOUNT PROFILE: cant create account profile", e);
      return null;
    });
    return userResponse;
  }

  static async GetPosts() {
    const publicationEntity = require("../entities/publication.entity");
    const publicationResponse = await publicationEntity
      .getPublications()
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT PROFILE: cant create account profile",
          e
        );
        return null;
      });
    return publicationResponse;
  }

  static async createReaction(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .create(data.idpublication, data.user_id)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT FEED: cant create reaction",
          e
        );
        return null;
      });
    return reactionResponse;
  }

  static async deleteReaction(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .delete(data.idpublication, data.user_id)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT FEED: cant delete reaction",
          e
        );
        return null;
      });
    return reactionResponse;
  }

  static async countReactionsByIdPublication(data) {
    console.log('countReactionsByIdPublication',data)
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .count(data.idpublication)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT FEED: cant count reactions",
          e
        );
        return null;
      });
    return {'count': reactionResponse};
  }

  static async countReactionsByIdUser(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .countReactionByUser(data.idpublication, data.user_id)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT FEED: can't count reactions by idpublication and iduser",
          e
        );
        return null;
      });
    return { 'count': reactionResponse };
  }

}

module.exports = FeedService;
```
## Clean Code

### CC1 - Comentarios
+ Intenta siempre explicarte en código.
+ No seas redundante.
+ No agregue ruido obvio.
+ No use comentarios de llaves de cierre.
+ No comente el código. Solo elimina.
+ Utilizar como explicación de la intención.
+ Utilizar como aclaración de código.
+ Utilizar como advertencia de las consecuencias.

```javascript
async deleteReaction(idpublication, user_id) {
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
  }, // ...
  ```
### CC2 - Capitalize SQL Special Words
+ La interacción con la base de datos es una parte importante de la mayoría de las aplicaciones web. Si está escribiendo consultas SQL sin procesar, es una buena idea mantenerlas legibles también.
+ Aunque las palabras especiales de SQL y los nombres de funciones no distinguen entre mayúsculas y minúsculas, es una práctica común usar mayúsculas para distinguirlos de los nombres de tablas y columnas.

```javascript
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
```
## Características Actuales

### Modelo de Reacciones a Publicaciones
Se ha agregado el modelo de reacciones de publicaciones al proyecto para manejar funciones respecto a las reacciones de una publicación. Incluye los siguientes atributos:
+ `id`: Una cadena que representa el ID único de una reacción.
+ `idpublication`: Un identificador que representa el ID único de una publicación.
+ `user_id`: Un identificador que representa el ID único del usuario.
+ `date`: Un timestamp para registrar fecha y hora exacta de eventos.

### Servicio de Feed
El servicio de feed se encarga de manejar funciones realacionadas a la cronología de las publicaciones en la red social. Se agregaron las siguientes funciones relacionadas a reacciones:
- `createReaction(data)`:
- `deleteReaction(data)`:
- `ountReactionsByIdPublication(data)`:
- `countReactionsByIdUser(data)`:

### Controlador de Feed
Se agregaron las siguientes funciones relacionadas a reacciones en el controlador de Feed:
+ `createReaction(req, res)`:
+ `deleteReaction(req, res)`:
+ `countReactionsByIdPublication(req, res)`:
+ `countReactionsByIdPublicationAndIdUser(req, res)`:
