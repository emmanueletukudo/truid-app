const {Router} = require("express");
const router = Router();
const SimCtrl = require("../controllers/simcheck.controller");

router.post("/access-token", SimCtrl.getAccessToken );
router.post("/sim-check", SimCtrl.check );


module.exports =  router;