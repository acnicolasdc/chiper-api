const express = require('express');
const ProductsService = require('../services/products');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { productIdSchema, createProductSchema, updateProductSchema} = require('../utils/schemas/products');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function productsApi(app) {
    const router = express.Router();
    const productsService = new ProductsService();
    app.use(corsHandler());
    app.use('/api/products', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { name } = req.query;
        try{
            const products = await productsService.getProducts({ name });
            res.status(200).json({
                data: products,
                message: buildMessage('product', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:productId', validationHandler({productId: productIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { productId } = req.params;
        try{
            const product = await productsService.getProduct({ productId });
            res.status(200).json({
                data: product,
                message: buildMessage('product', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createProductSchema) ,async function(req, res, next){
        const { body: product } = req;
        try{
            const createdProductId = await productsService.createProduct({ product });
            res.status(201).json({
                data: createdProductId,
                message: buildMessage('product', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:productId', validationHandler({productId: productIdSchema}, 'params'), validationHandler(updateProductSchema),async function(req, res, next){
        const { productId } = req.params;
        const { body: product } = req;
        try{
            const updatedProductId = await productsService.updateProduct({ productId, product });
            res.status(200).json({
                data: updatedProductId,
                message: buildMessage('product', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:productId', validationHandler({productId: productIdSchema}, 'params'), async function(req, res, next){
        const { productId } = req.params;
        try{
            const deletedProductId = await productsService.deleteProduct({ productId });
            res.status(200).json({
                data: deletedProductId,
                message: buildMessage('product', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = productsApi;