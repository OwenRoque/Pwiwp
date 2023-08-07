var express = require('express');
var router = express.Router();
const FeedController = require("./feed.controller");
const auth = require("../../../utils/auth");

//apis
router.post('/api/publication/push',auth.middlewareUserApi, FeedController.PublishPublication);
router.post('/api/publication/getall', FeedController.GetPublications);
/*reactions */
router.post('/api/reaction/push', FeedController.createReaction);
router.post('/api/reaction/delete', FeedController.deleteReaction);
router.get('/api/reaction/countbypublication', FeedController.countReactionsByIdPublication);
router.get('/api/reaction/countbyuser', FeedController.countReactionsByIdPublicationAndIdUser);
module.exports = router;
