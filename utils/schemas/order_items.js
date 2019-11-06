const Joi = require('@hapi/joi');

const orderItemsIdSchema = Joi.string();

// Atributes to validate
const orderIdSchema = Joi.string();
const productIdSchema = Joi.string();
const quantitySchema = Joi.number().min(0);
const productAttributeIdSchema = Joi.string();

const createOrderItemsSchema = Joi.object({
    order_id: orderIdSchema.required(),
    product_id: productIdSchema.required(),
    quantity: quantitySchema.required(),
    product_attribute_id: productAttributeIdSchema.required(),
});

const updateOrderItemsSchema = Joi.object({
    order_id: orderIdSchema,
    product_id: productIdSchema,
    quantity: quantitySchema,
    product_attribute_id: productAttributeIdSchema,
});

module.exports = {
    orderItemsIdSchema,
    createOrderItemsSchema,
    updateOrderItemsSchema
};