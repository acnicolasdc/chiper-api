const Joi = require('@hapi/joi');

const productIdSchema = Joi.string();

// Atributes to validate
const nameSchema = Joi.string().min(2);
const imageSchema = Joi.string().dataUri();
const priceSchema = Joi.number().min(5);
const stockSchema = Joi.number().min(0);
const categoryIdSchema = Joi.string();
const statusSchema = Joi.number();
const createdAtSchema = Joi.date();

const createProductSchema = Joi.object({
    name: nameSchema.require(),
    image: imageSchema.require(),
    price: priceSchema.require(),
    stock: stockSchema.require(),
    category_id: categoryIdSchema.require(),
    status: statusSchema.require(),
    created_at:createdAtSchema.require(),
});

const updateProductSchema = Joi.object({
    name: nameSchema,
    image: imageSchema,
    price: priceSchema,
    stock: stockSchema,
    category_id: categoryIdSchema,
    status: statusSchema,
    created_at:createdAtSchema,
});

module.exports = {
    productIdSchema,
    createProductSchema,
    updateProductSchema
};