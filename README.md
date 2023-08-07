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
