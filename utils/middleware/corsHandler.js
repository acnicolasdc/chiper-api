const cors = require("cors");
const { config } = require('../../config/index');

function corsHandler(){
    if(config.dev)return cors();
    const corsOptions = { origin: "http://example.com" };
    return cors(corsOptions);
}

module.exports = corsHandler;