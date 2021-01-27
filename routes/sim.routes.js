const {Router} = require("express");
const router = Router();

let options = {
    uri: baseUrl,
    method: 'POST',
    json: true,
    headers: {
      "Authorization": Basic + {credentials},
      "Content-Type": application/x-www-form-urlencoded,
    }
  };
router.post("/oauth2/v1/token")