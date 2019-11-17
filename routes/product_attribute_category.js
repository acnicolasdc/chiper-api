const express = require('express');
const ProductAttributeCategoryService = require('../services/product_attribute_category');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { productAttributeCategoryIdSchema, createProductAttributeCategorySchema, updateProductAttributeCategorySchema} = require('../utils/schemas/product_attribute_category');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function productAttributeCategoryApi(app) {
    const router = express.Router();
    const productAttributeCategoryService = new ProductAttributeCategoryService();
    app.use(corsHandler());
    app.use('/api/productAttributeCategory', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { productAttributeCategoryId } = req.query;
        try{
            const productAttributeCategory = await productAttributeCategoryService.getProductAttributeCategories({ productAttributeCategoryId });
            res.status(200).json({
                data: productAttributeCategory,
                message: buildMessage('productAttributeCategory', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:productAttributeCategoryId', validationHandler({productAttributeCategoryId: productAttributeCategoryIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { productAttributeCategoryId } = req.params;
        try{
            const productAttributeCategory = await productAttributeCategoryService.getProductAttributeCategory({ productAttributeCategoryId });
            res.status(200).json({
                data: productAttributeCategory,
                message: buildMessage('productAttributeCategory', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createProductAttributeCategorySchema) ,async function(req, res, next){
        const { body: productAttributeCategory } = req;
        try{
            const createdProductAttributeCategoryId = await productAttributeCategoryService.createProductAttributeCategory({ productAttributeCategory });
            res.status(201).json({
                data: createdProductAttributeCategoryId,
                message: buildMessage('productAttributeCategory', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:productAttributeCategoryId', validationHandler({productAttributeCategoryId: productAttributeCategoryIdSchema}, 'params'), validationHandler(updateProductAttributeCategorySchema),async function(req, res, next){
        const { productAttributeCategoryId } = req.params;
        const { body: productAttributeCategory } = req;
        try{
            const updatedProductAttributeCategoryId = await productAttributeCategoryService.updateProductAttributeCategory({ productAttributeCategoryId, productAttributeCategory });
            res.status(200).json({
                data: updatedProductAttributeCategoryId,
                message: buildMessage('productAttributeCategory', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:productAttributeCategoryId', validationHandler({productAttributeCategoryId: productAttributeCategoryIdSchema}, 'params'), async function(req, res, next){
        const { productAttributeCategoryId } = req.params;
        try{
            const deletedProductAttributeCategoryId = await productAttributeCategoryService.deleteProductAttributeCategory({ productAttributeCategoryId });
            res.status(200).json({
                data: deletedProductAttributeCategoryId,
                message: buildMessage('productAttributeCategory', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = productAttributeCategoryApi;