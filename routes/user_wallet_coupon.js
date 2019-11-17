const express = require('express');
const UserWalletCouponService = require('../services/user_wallet_coupon');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { userWalletCouponIdSchema, createUserWalletCouponSchema, updateUserWalletCouponSchema} = require('../utils/schemas/user_wallet_coupon');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function userWalletCouponApi(app) {
    const router = express.Router();
    const userWalletCouponService = new UserWalletCouponService();
    app.use(corsHandler());
    app.use('/api/userWalletCoupon', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { walletCouponId } = req.query;
        try{
            const userWalletCoupons = await userWalletCouponService.getUserWalletCoupons({ walletCouponId });
            res.status(200).json({
                data: userWalletCoupons,
                message: buildMessage('userWalletCoupon', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:userWalletCouponId', validationHandler({userWalletCouponId: userWalletCouponIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { userWalletCouponId } = req.params;
        try{
            const userWalletCoupon = await userWalletCouponService.getUserWalletCoupon({ userWalletCouponId });
            res.status(200).json({
                data: userWalletCoupon,
                message: buildMessage('userWalletCoupon', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createUserWalletCouponSchema) ,async function(req, res, next){
        const { body: userWalletCoupon } = req;
        try{
            const createdUserWalletCouponId = await userWalletCouponService.createUserWalletCoupon({ userWalletCoupon });
            res.status(201).json({
                data: createdUserWalletCouponId,
                message: buildMessage('userWalletCoupon', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:userWalletCouponId', validationHandler({userWalletCouponId: userWalletCouponIdSchema}, 'params'), validationHandler(updateUserWalletCouponSchema),async function(req, res, next){
        const { userWalletCouponId } = req.params;
        const { body: userWalletCoupon } = req;
        try{
            const updatedUserWalletCouponId = await userWalletCouponService.updateUserWalletCoupon({ userWalletCouponId, userWalletCoupon });
            res.status(200).json({
                data: updatedUserWalletCouponId,
                message: buildMessage('userWalletCoupon', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:userWalletCouponId', validationHandler({userWalletCouponId: userWalletCouponIdSchema}, 'params'), async function(req, res, next){
        const { userWalletCouponId } = req.params;
        try{
            const deletedUserWalletCouponId = await userWalletCouponService.deleteUserWalletCoupon({ userWalletCouponId });
            res.status(200).json({
                data: deletedUserWalletCouponId,
                message: buildMessage('userWalletCoupon', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = userWalletCouponApi;