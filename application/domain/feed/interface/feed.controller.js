class FeedController {
  static async PublishPublication(req, res) {
    const FeetService = require("../services/feed.service");
    req.body.id = req.datatoken.id;
    const data = await FeetService.PublishPublication(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not publish");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Post publicado",
        data: data,
      });
    } else {
      return res.json({
        status: "error",
        msg: "Error al publicar post",
        data: null,
      });
    }
  }
  static async GetPublications(req, res) {
    console.log("get")
    const FeedService = require("../services/feed.service");
    const data = await FeedService.GetPosts().catch((e) => {
      console.error("Feed CONTROLLER: cant not get");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Todas las Publicaciones",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "Error al obtener publicaciones",
      data: null,
    });
  }

  /* Crear una reaccion a una publicacion, recibe idpublication y iduser */
  static async createReaction(req, res) {
    console.log("createReaction")
    const FeedService = require("../services/feed.service");
    const data = await FeedService.createReaction(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not createReaction");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Reaction created",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "can't created reaction",
      data: null,
    });
  }

  /* Eliminar una reaccion hecha a una publicacion, recibe idpublication y iduser */
  static async deleteReaction(req, res) {
    console.log("deleteReaction")
    const FeedService = require("../services/feed.service");
    const data = await FeedService.deleteReaction(req.body).catch((e) => {
      console.error("Feed CONTROLLER: cant not deleteReaction");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "Reaction deleted",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "can't deleted reaction",
      data: null,
    });
  }

  /* Contar las reacciones hechas a una publicacion*/
  static async countReactionsByIdPublication(req, res) {
    console.log("countReactionsByIdPublication")
    const FeedService = require("../services/feed.service");
    const data = await FeedService.countReactionsByIdPublication(req.body).catch((e) => {
      console.error("Feed CONTROLLER: can't not count Reaction");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "count Reaction",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "can't count reaction",
      data: null,
    });
  }

  /* Contar las reacciones hechas por una publicacion y un usuario, devolvera 0 o 1 */
  static async countReactionsByIdPublicationAndIdUser(req, res) {
    console.log("countReactionsByIdPublicationAndIdUser")
    const FeedService = require("../services/feed.service");
    const data = await FeedService.countReactionsByIdUser(req.body).catch((e) => {
      console.error("Feed CONTROLLER: can't not count Reaction");
      return null;
    });
    if (data) {
      return res.json({
        status: "ok",
        msg: "count Reaction",
        data: data,
      });
    }
    return res.json({
      status: "error",
      msg: "can't count reaction",
      data: null,
    });
  }
}

module.exports = FeedController;
