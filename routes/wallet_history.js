const express = require('express');
const WalletHistoryService = require('../services/wallet_history');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { walletHistoryIdSchema, createWalletHistorySchema, updateWalletHistorySchema} = require('../utils/schemas/wallet_history');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function walletHistoryApi(app) {
    const router = express.Router();
    const walletHistoryService = new WalletHistoryService();
    app.use(corsHandler());
    app.use('/api/walletHistory', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { walletHistoryCode } = req.query;
        try{
            const walletHistories = await walletHistoryService.getWalletHistories({ walletHistoryCode });
            res.status(200).json({
                data: walletHistories,
                message: buildMessage('walletHistory', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:walletHistoryId', validationHandler({walletHistoryId: walletHistoryIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { walletHistoryId } = req.params;
        try{
            const walletHistory = await walletHistoryService.getWalletHistory({ walletHistoryId });
            res.status(200).json({
                data: walletHistory,
                message: buildMessage('walletHistory', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createWalletHistorySchema) ,async function(req, res, next){
        const { body: walletHistory } = req;
        try{
            const createdWalletHistoryId = await walletHistoryService.createWalletHistory({ walletHistory });
            res.status(201).json({
                data: createdWalletHistoryId,
                message: buildMessage('walletHistory', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:walletHistoryId', validationHandler({walletHistoryId: walletHistoryIdSchema}, 'params'), validationHandler(updateWalletHistorySchema),async function(req, res, next){
        const { walletHistoryId } = req.params;
        const { body: walletHistory } = req;
        try{
            const updatedWalletHistoryId = await walletHistoryService.updateWalletHistory({ walletHistoryId, walletHistory });
            res.status(200).json({
                data: updatedWalletHistoryId,
                message: buildMessage('walletHistory', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:walletHistoryId', validationHandler({walletHistoryId: walletHistoryIdSchema}, 'params'), async function(req, res, next){
        const { walletHistoryId } = req.params;
        try{
            const deletedWalletHistoryId = await walletHistoryService.deleteWalletHistory({ walletHistoryId });
            res.status(200).json({
                data: deletedWalletHistoryId,
                message: buildMessage('walletHistory', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = walletHistoryApi;