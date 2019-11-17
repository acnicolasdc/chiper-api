const express = require('express');
const ProductAttributeService = require('../services/product_attribute');
const buildMessage = require('../utils/buildMessage');
const corsHandler = require('../utils/middleware/corsHandler');
const { productAttributeIdSchema, createProductAttributeSchema, updateProductAttributeSchema} = require('../utils/schemas/product_attribute');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse = require('../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time');

function productAttributeApi(app) {
    const router = express.Router();
    const productAttributeService = new ProductAttributeService();
    app.use(corsHandler());
    app.use('/api/productAttribute', router);

    router.get('/', async function(req, res, next){
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const { productAttributeId } = req.query;
        try{
            const productAttribute = await productAttributeService.getProductAttributes({ productAttributeId });
            res.status(200).json({
                data: productAttribute,
                message: buildMessage('productAttribute', 'list')
            });
        }catch(err){
            next(err);
        }
    });

    router.get('/:productAttributeId', validationHandler({productAttributeId: productAttributeIdSchema}, 'params') ,async function(req, res, next){
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
        const { productAttributeId } = req.params;
        try{
            const productAttribute = await productAttributeService.getProductAttribute({ productAttributeId });
            res.status(200).json({
                data: productAttribute,
                message: buildMessage('productAttribute', 'retrieve')
            });
        }catch(err){
            next(err);
        }
    });

    router.post('/', validationHandler(createProductAttributeSchema) ,async function(req, res, next){
        const { body: productAttribute } = req;
        try{
            const createdProductAttributeId = await productAttributeService.createProductAttribute({ productAttribute });
            res.status(201).json({
                data: createdProductAttributeId,
                message: buildMessage('productAttribute', 'create')
            });
        }catch(err){
            next(err);
        }
    });

    router.put('/:productAttributeId', validationHandler({productAttributeId: productAttributeIdSchema}, 'params'), validationHandler(updateProductAttributeSchema),async function(req, res, next){
        const { productAttributeId } = req.params;
        const { body: productAttribute } = req;
        try{
            const updatedProductAttributeId = await productAttributeService.updateProductAttribute({ productAttributeId, productAttribute });
            res.status(200).json({
                data: updatedProductAttributeId,
                message: buildMessage('productAttribute', 'update')
            });
        }catch(err){
            next(err);
        }
    });

    router.delete('/:productAttributeId', validationHandler({productAttributeId: productAttributeIdSchema}, 'params'), async function(req, res, next){
        const { productAttributeId } = req.params;
        try{
            const deletedProductAttributeId = await productAttributeService.deleteProductAttribute({ productAttributeId });
            res.status(200).json({
                data: deletedProductAttributeId,
                message: buildMessage('productAttribute', 'delete')
            });
        }catch(err){
            next(err);
        }
    });
}

module.exports = productAttributeApi;