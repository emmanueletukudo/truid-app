const axios = require("axios");
let qs = require('qs');
const base_URL = "https://eu.api.tru.id";
const trueCredentials = require("../tru.json");

const SimCheckController = {
  getAccessToken: async (req, res, next) => {
    try {
      const reqObj = {
        URI: `${base_URL}/oauth2/v1/token`,
        //conver params to string suing qs package as recommended by the doc.
        params: qs.stringify({
          grant_type: "client_credentials",
          scope: "sim_check",
        }),
      };

      
      //convert credentials to base64
      // console.log(trueCredentials.credentials[0].client_id);
      let clientDetails = `${trueCredentials.credentials[0].client_id}:${trueCredentials.credentials[0].client_secret}`;
      let encoded_credentials = Buffer.from(clientDetails).toString("base64");

      const headers = {
        Authorization: `Basic ${encoded_credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const tokenRes = await axios.post(reqObj.URI, reqObj.params, {
        headers: headers,
      });

      res.json(tokenRes.data);
    } catch (error) {
      console.log(error);
    }
  },

  check: async (req, res, next) => {
    try {
      let { phone } = req.body;
      if (!phone) {
        return res
          .status(422)
          .json({ phone: "The phone number field is required" });
      }
      const checkRes = await this.simCheck(phone);

      // res.json({
      //     no_sim_change: simCheck.no_sim_change,
      //     last_sim_change_at: simCheck.last_sim_change_at
      // })
      res.json(checkRes);
    } catch (error) {
      console.log(error);
    }
  },

  simCheck: async (phone) => {
    try {
      const reqObj = {
        URI: `${base_URL}/phone_check/v0.1/checks`,
        params: { phone_number: phone },
      };
      let access_token = await this.getAccessToken().access_token;

      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      const simCheckRes = await axios.post(reqObj.URI, reqObj.params, {
        headers: headers,
      });

      return simCheckRes.data;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = SimCheckController;
