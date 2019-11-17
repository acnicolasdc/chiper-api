const express = require('express');
const OrderStatusesService = require('../services/order_statuses');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const {orderStatusesIdSchema, createOrderStatusesSchema, updateOrderStatusesSchema} = require('../utils/schemas/order_statuses');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function orderStatusesApi(app) {
    const router = express.Router();
    const orderStatusesService = new OrderStatusesService();
    app.use(corsHandler());
    app.use('/api/orderStatuses', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { orderStatusesId } = req.query;
        try{
            const ordersStatuses = await orderStatusesService.getOrdersStatuses({ orderStatusesId });
            res.status(200).json({
                data: ordersStatuses,
                message: buildMessage('ordersStatuses', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:orderStatusesId', validationHandler({orderStatusesId: orderStatusesIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { orderStatusesId } = req.params;
        try{
            const orderStatuses = await orderStatusesService.getOrderStatuses({ orderStatusesId });
            res.status(200).json({
                data: orderStatuses,
                message: buildMessage('orderStatuses', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createOrderStatusesSchema) ,async function(req, res, next){
        const { body: orderStatuses } = req;
        try{
            const createdOrderStatusesId = await orderStatusesService.createOrderStatuses({ orderStatuses });
            res.status(201).json({
                data: createdOrderStatusesId,
                message: buildMessage('orderStatuses', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:orderStatusesId', validationHandler({orderStatusesId: orderStatusesIdSchema}, 'params'), validationHandler(updateOrderStatusesSchema),async function(req, res, next){
        const { orderStatusesId } = req.params;
        const { body: orderStatuses } = req;
        try{
            const updatedOrderStatusesId = await orderStatusesService.updateOrderStatuses({ orderStatusesId, orderStatuses });
            res.status(200).json({
                data: updatedOrderStatusesId,
                message: buildMessage('orderStatuses', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:orderStatusesId', validationHandler({orderStatusesId: orderStatusesIdSchema}, 'params'), async function(req, res, next){
        const { orderStatusesId } = req.params;
        try{
            const deletedOrderStatusesId = await orderStatusesService.deleteOrderStatuses({ orderStatusesId });
            res.status(200).json({
                data: deletedOrderStatusesId,
                message: buildMessage('orderStatuses', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = orderStatusesApi;