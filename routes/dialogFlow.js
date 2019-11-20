const express = require('express');
const DialogFlowLib = require('../lib/dialogFlow');
const corsHandler = require('../utils/middleware/corsHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');

function dialogFlowApi(app) {
    const router = express.Router();
    const dialogFlowLib = new DialogFlowLib();
    app.use(corsHandler());
    app.use('/api/dialogFlow', router);

    router.post('/', async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        try {
            const { intent, parameters, outputContexts, queryText } = req.body.queryResult;
            const response = await dialogFlowLib.connect(intent, parameters, outputContexts, queryText);
            console.log(response);
            res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    });
}

module.exports = dialogFlowApi;
