const axios = require("axios");
const base_URL = "https://eu.api.tru.id";
const trueCredentials = require("../tru.json");



async function SimCheck(req, res) {
    const phoneNumber = req.body.phone_number || // application/json
                        req.form.phone_number    // application/x-www-form-urlencoded
    if(!phoneNumber) {
        res.json({'error_message': 'phone_number parameter is required'}).status(400)
        return
    }

    try {
        const simCheck = await createSimCheck(req.body.phone_number)
        log(simCheck)

        // Select data to send to client
        res.json({
            no_sim_change: simCheck.no_sim_change,
            last_sim_change_at: simCheck.last_sim_change_at
        })
    }
    catch(error) {
        log('error in creating SIMCheck')
        log(error.toString(), error.data)

        res.send('Whoops!').status(500)
    }
}
app.post('/sim-check', SimCheck)


const SimCheckController = {
    
    getAccessToken: async (req, res, next) => {
        try {

            const reqObj = {
                URI: `${base_URL}/oauth2/v1/token`,
                params: qs.stringify({ grant_type: 'client_credentials', scope: 'sim_check'}),
            };

            //convert credentials to base64
            let clientDetails = `${trueCredentials[0].client_id}:${trueCredentials[0].client_secret}`;
            let encoded_credentials = Buffer.from(clientDetails).toString("base64");
            
            const headers = {
                Authorization: `Basic ${encoded_credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }

            const tokenRes =  await axios.post(reqObj.URI, reqObj.params, {
                headers: headers,
            });

            res.json(tokenRes.data);

        } catch (error) {
            console.log(error);
        }
    },

    check: async (req, res, next) => {
        try {
            let {phone} = req.body;
            
        } catch (error) {
            console.log(error);
        }
    },

    simCheck: async (phone) => {
        try {
            
            const reqObj = {
                URI: `${base_URL}/phone_check/v0.1/checks`,
                params: {phone_number: phone},
            };
            let access_token = await this.getAccessToken().access_token;

            const headers = {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }

            const simCheckRes = await axios.post(reqObj.URI, reqObj.params, {
                headers: headers
            });
            return simCheckRes;
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = SimCheckController;