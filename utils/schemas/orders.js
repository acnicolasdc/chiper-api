const Joi = require('@hapi/joi');

const orderIdSchema = Joi.string();

// Atributes to validate
const userIdSchema = Joi.string();
const orderStatusIdSchema = Joi.string();
const totalSchema = Joi.number().min(0);
const addressSchema = Joi.string();
const deliveryDateSchema = Joi.date();
const createdAtSchema = Joi.date().timestamp();

const createOrderSchema = Joi.object({
    user_id: userIdSchema.required(),
    order_status_id: orderStatusIdSchema.required(),
    total: totalSchema.required(),
    address: addressSchema.required(),
    delivery_date: deliveryDateSchema.required(),
    created_at: createdAtSchema.required()
});

const updateOrderSchema = Joi.object({
    user_id: userIdSchema,
    order_status_id: orderStatusIdSchema,
    total: totalSchema,
    address: addressSchema,
    delivery_date: deliveryDateSchema,
    created_at: createdAtSchema
});

module.exports = {
    orderIdSchema,
    createOrderSchema,
    updateOrderSchema
};