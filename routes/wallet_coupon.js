const express = require('express');
const WalletCouponService = require('../services/wallet_coupon');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { walletCouponIdSchema, createWalletCouponSchema, updateWalletCouponSchema} = require('../utils/schemas/wallet_coupon');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function walletCouponApi(app) {
    const router = express.Router();
    const walletCouponService = new WalletCouponService();
    app.use(corsHandler());
    app.use('/api/walletCoupon', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { walletCouponCode } = req.query;
        try{
            const walletCoupons = await walletCouponService.getWalletCoupons({ walletCouponCode });
            res.status(200).json({
                data: walletCoupons,
                message: buildMessage('walletCoupon', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:walletCouponId', validationHandler({walletCouponId: walletCouponIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { walletCouponId } = req.params;
        try{
            const walletCoupon = await walletCouponService.getWalletCoupon({ walletCouponId });
            res.status(200).json({
                data: walletCoupon,
                message: buildMessage('walletCoupon', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createWalletCouponSchema) ,async function(req, res, next){
        const { body: walletCoupon } = req;
        try{
            const createdWalletCouponId = await walletCouponService.createWalletCoupon({ walletCoupon });
            res.status(201).json({
                data: createdWalletCouponId,
                message: buildMessage('walletCoupon', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:walletCouponId', validationHandler({walletCouponId: walletCouponIdSchema}, 'params'), validationHandler(updateWalletCouponSchema),async function(req, res, next){
        const { walletCouponId } = req.params;
        const { body: walletCoupon } = req;
        try{
            const updatedWalletCouponId = await walletCouponService.updateWalletCoupon({ walletCouponId, walletCoupon });
            res.status(200).json({
                data: updatedWalletCouponId,
                message: buildMessage('walletCoupon', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:walletCouponId', validationHandler({walletCouponId: walletCouponIdSchema}, 'params'), async function(req, res, next){
        const { walletCouponId } = req.params;
        try{
            const deletedWalletCouponId = await walletCouponService.deleteWalletCoupon({ walletCouponId });
            res.status(200).json({
                data: deletedWalletCouponId,
                message: buildMessage('walletCoupon', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = walletCouponApi;