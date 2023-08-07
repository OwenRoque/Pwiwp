var express = require('express');
var router = express.Router();
const AutorController = require("./autor.controller");
const auth = require("../../../utils/auth");

router.get('/', auth.middlewareUser, AutorController.Index);
router.get('/register', AutorController.Register);

//apis
router.post('/api/register', AutorController.RegisterAccount);
router.post('/api/login', AutorController.Login);
module.exports = router;
