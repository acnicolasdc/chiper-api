const express = require('express');
const WalletService = require('../services/wallet');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { walletIdSchema, createWalletSchema, updateWalletSchema} = require('../utils/schemas/wallet');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function walletApi(app) {
    const router = express.Router();
    const walletService = new WalletService();
    app.use(corsHandler());
    app.use('/api/wallet', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { walletType } = req.query;
        try{
            const wallets = await walletService.getWallets({ walletType });
            res.status(200).json({
                data: wallets,
                message: buildMessage('wallet', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:walletId', validationHandler({walletId: walletIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { walletId } = req.params;
        try{
            const wallet = await walletService.getWallet({ walletId });
            res.status(200).json({
                data: wallet,
                message: buildMessage('wallet', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createWalletSchema) ,async function(req, res, next){
        const { body: wallet } = req;
        try{
            const createdWalletId = await walletService.createWallet({ wallet });
            res.status(201).json({
                data: createdWalletId,
                message: buildMessage('wallet', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:walletId', validationHandler({walletId: walletIdSchema}, 'params'), validationHandler(updateWalletSchema),async function(req, res, next){
        const { walletId } = req.params;
        const { body: wallet } = req;
        try{
            const updatedWalletId = await walletService.updateWallet({ walletId, wallet });
            res.status(200).json({
                data: updatedWalletId,
                message: buildMessage('wallet', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:walletId', validationHandler({walletId: walletIdSchema}, 'params'), async function(req, res, next){
        const { walletId } = req.params;
        try{
            const deletedWalletId = await walletService.deleteWallet({ walletId });
            res.status(200).json({
                data: deletedWalletId,
                message: buildMessage('wallet', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = walletApi;