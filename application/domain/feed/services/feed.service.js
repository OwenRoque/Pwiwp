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
    return reactionResponse;
  }

  static async countReactionsByIdUser(data) {
    const reactionEntity = require("../entities/reaction.entity");
    const reactionResponse = await reactionEntity
      .countReactionByUser(data.idpublication, data.iduser)
      .catch((e) => {
        console.error(
          "SERVICE ACCOUNT FEED: can't count reactions by idpublication and iduser",
          e
        );
        return null;
      });
    return reactionResponse;
  }

}

module.exports = FeedService;
