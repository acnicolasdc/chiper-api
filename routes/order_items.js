const express = require('express');
const OrderItemsService = require('../services/order_items');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const {orderItemsIdSchema, createOrderItemsSchema, updateOrderItemsSchema} = require('../utils/schemas/order_items');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function ordersItemsApi(app) {
    const router = express.Router();
    const orderItemsService = new OrderItemsService();
    app.use(corsHandler());
    app.use('/api/orderItems', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { orderItemsId } = req.query;
        try{
            const ordersItems = await orderItemsService.getOrdersItems({ orderItemsId });
            res.status(200).json({
                data: ordersItems,
                message: buildMessage('ordersItem', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:orderItemsId', validationHandler({orderItemsId: orderItemsIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { orderItemsId } = req.params;
        try{
            const orderItems = await orderItemsService.getOrderItems({ orderItemsId });
            res.status(200).json({
                data: orderItems,
                message: buildMessage('orderItem', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createOrderItemsSchema) ,async function(req, res, next){
        const { body: orderItems } = req;
        try{
            const createdOrderItemsId = await orderItemsService.createOrderItems({ orderItems });
            res.status(201).json({
                data: createdOrderItemsId,
                message: buildMessage('orderItem', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:orderItemsId', validationHandler({orderItemsId: orderItemsIdSchema}, 'params'), validationHandler(updateOrderItemsSchema),async function(req, res, next){
        const { orderItemsId } = req.params;
        const { body: orderItems } = req;
        try{
            const updatedOrderItemsId = await orderItemsService.updateOrderItems({ orderItemsId, orderItems });
            res.status(200).json({
                data: updatedOrderItemsId,
                message: buildMessage('orderItem', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:orderItemsId', validationHandler({orderItemsId: orderItemsIdSchema}, 'params'), async function(req, res, next){
        const { orderItemsId } = req.params;
        try{
            const deletedOrderItemsId = await orderItemsService.deleteOrderItems({ orderItemsId });
            res.status(200).json({
                data: deletedOrderItemsId,
                message: buildMessage('orderItem', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = ordersItemsApi;