const express = require('express');
const ProductCategoriesService = require('../services/product_categories');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { productCategoriesIdSchema, createProductCategoriesSchema, updateProductCategoriesSchema} = require('../utils/schemas/product_categories');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function productCategoriesApi(app) {
    const router = express.Router();
    const productCategoriesService = new ProductCategoriesService();
    app.use(corsHandler());
    app.use('/api/productCategories', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { productCategoriesId } = req.query;
        try{
            const productCategories = await productCategoriesService.getCategories({ productCategoriesId });
            res.status(200).json({
                data: productCategories,
                message: buildMessage('category', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:productCategoriesId', validationHandler({productCategoriesId: productCategoriesIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { productCategoriesId } = req.params;
        try{
            const productCategories = await productCategoriesService.getCategory({ productCategoriesId });
            res.status(200).json({
                data: productCategories,
                message: buildMessage('category', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createProductCategoriesSchema) ,async function(req, res, next){
        const { body: productCategories } = req;
        try{
            const createdProductCategoriesId = await productCategoriesService.createCategory({ productCategories });
            res.status(201).json({
                data: createdProductCategoriesId,
                message: buildMessage('category', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:productCategoriesId', validationHandler({productCategoriesId: productCategoriesIdSchema}, 'params'), validationHandler(updateProductCategoriesSchema),async function(req, res, next){
        const { productCategoriesId } = req.params;
        const { body: productCategories } = req;
        try{
            const updatedProductCategoriesId = await productCategoriesService.updateCategory({ productCategoriesId, productCategories });
            res.status(200).json({
                data: updatedProductCategoriesId,
                message: buildMessage('category', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:productCategoriesId', validationHandler({productCategoriesId: productCategoriesIdSchema}, 'params'), async function(req, res, next){
        const { productCategoriesId } = req.params;
        try{
            const deletedProductCategoriesId = await productCategoriesService.deleteCategory({ productCategoriesId });
            res.status(200).json({
                data: deletedProductCategoriesId,
                message: buildMessage('category', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = productCategoriesApi;