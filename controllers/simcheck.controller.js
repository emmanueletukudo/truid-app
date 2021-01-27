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

/**
 * Creates an Access Token withon `phone_check` scope.
 */
async function getAccessToken() {
    log('getAccessToken')

    const url = `${API_BASE_URL}/oauth2/v1/token`
    const params = qs.stringify({
        grant_type: 'client_credentials',

        // scope to use depends on product
        scope: ['phone_check sim_check']
    })

    const toEncode = `${config.credentials[0].client_id}:${config.credentials[0].client_secret}`
    const auth = Buffer.from(toEncode).toString('base64')
    const requestHeaders = {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    log('url', url)
    log('params', params)
    log('requestHeaders', requestHeaders)

    const accessTokenResult = await axios.post(url, params, {
        headers: requestHeaders
    })

    log('accessTokenResult.data', accessTokenResult.data)

    return accessTokenResult.data
}

function log() {
    if(DEBUG) {
        console.debug.apply(null, arguments)
    }
}


const SimCheckController = {
    createToken: async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}
app.post('/oauth2/v1/token', function(req, res, next) {

    const url = base_URL;
    let credentials = trueCredentials.credentials;
  
    var options = {
      uri: baseUrl,
      method: 'POST',
      json: true,
      headers: {
        Authorization: Basic + {credentials},
        "Content-Type": application/x-www-form-urlencoded,
      }
    };


}) 