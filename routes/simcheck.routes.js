const {Router} = require("express");
const router = Router();
const SimCtrl = require("../controllers/simcheck.controller");

router.post("/access/token", SimCtrl.getAccessToken );


module.exports =  router;