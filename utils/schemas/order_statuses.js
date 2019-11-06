const Joi = require('@hapi/joi');

const orderStatusesIdSchema = Joi.string();

// Atributes to validate
const nameSchema = Joi.string().min(2);
const colorSchema = Joi.string().hex();//HEXADECIMAL COLOR

const createOrderStatusesSchema = Joi.object({
    name: nameSchema.required(),
    color: colorSchema.required(),
});

const updateOrderStatusesSchema = Joi.object({
    name: nameSchema,
    color: colorSchema,
});

module.exports = {
    orderStatusesIdSchema,
    createOrderStatusesSchema,
    updateOrderStatusesSchema
};