const express = require('express');
const UsersService = require('../services/users');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { userIdSchema, createUserSchema, updateUserSchema} = require('../utils/schemas/users');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function usersApi(app) {
    const router = express.Router();
    const usersService = new UsersService();
    app.use(corsHandler());
    app.use('/api/users', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { date } = req.query;
        try{
            const users = await usersService.getOrders({ date });
            res.status(200).json({
                data: users,
                message: buildMessage('user', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:userId', validationHandler({userId: userIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { userId } = req.params;
        try{
            const user = await usersService.getOrder({ userId });
            res.status(200).json({
                data: user,
                message: buildMessage('user', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createUserSchema) ,async function(req, res, next){
        const { body: user } = req;
        try{
            const createdUserId = await usersService.createOrder({ user });
            res.status(201).json({
                data: createdUserId,
                message: buildMessage('user', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:userId', validationHandler({userId: userIdSchema}, 'params'), validationHandler(updateUserSchema),async function(req, res, next){
        const { userId } = req.params;
        const { body: user } = req;
        try{
            const updatedUserId = await usersService.updateOrder({ userId, user });
            res.status(200).json({
                data: updatedUserId,
                message: buildMessage('user', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:userId', validationHandler({userId: userIdSchema}, 'params'), async function(req, res, next){
        const { userId } = req.params;
        try{
            const deletedUserId = await usersService.deleteOrder({ userId });
            res.status(200).json({
                data: deletedUserId,
                message: buildMessage('user', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = usersApi;