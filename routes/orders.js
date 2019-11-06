const express = require('express');
const OrdersService = require('../services/orders');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { orderIdSchema, createOrderSchema, updateOrderSchema} = require('../utils/schemas/orders');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function ordersApi(app) {
    const router = express.Router();
    const ordersService = new OrdersService();
    app.use(corsHandler());
    app.use('/api/orders', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { date } = req.query;
        try{
            const orders = await ordersService.getOrders({ date });
            res.status(200).json({
                data: orders,
                message: buildMessage('order', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:orderId', validationHandler({orderId: orderIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { orderId } = req.params;
        try{
            const order = await ordersService.getOrder({ orderId });
            res.status(200).json({
                data: order,
                message: buildMessage('order', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createOrderSchema) ,async function(req, res, next){
        const { body: order } = req;
        try{
            const createdOrderId = await ordersService.createOrder({ order });
            res.status(201).json({
                data: createdOrderId,
                message: buildMessage('order', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:orderId', validationHandler({orderId: orderIdSchema}, 'params'), validationHandler(updateOrderSchema),async function(req, res, next){
        const { orderId } = req.params;
        const { body: order } = req;
        try{
            const updatedOrderId = await ordersService.updateOrder({ orderId, order });
            res.status(200).json({
                data: updatedOrderId,
                message: buildMessage('order', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:orderId', validationHandler({orderId: orderIdSchema}, 'params'), async function(req, res, next){
        const { orderId } = req.params;
        try{
            const deletedOrderId = await ordersService.deleteOrder({ orderId });
            res.status(200).json({
                data: deletedOrderId,
                message: buildMessage('order', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = ordersApi;