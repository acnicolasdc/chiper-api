const Joi = require('@hapi/joi');

const productIdSchema = Joi.string();

// Atributes to validate
const nameSchema = Joi.string().min(2);
const imageSchema = Joi.string().uri();
const priceSchema = Joi.number().min(5);
const stockSchema = Joi.number().min(0);
const categoryIdSchema = Joi.string();
const statusSchema = Joi.number();
const createdAtSchema = Joi.date().timestamp();;

const createProductSchema = Joi.object({
    name: nameSchema.required(),
    image: imageSchema.required(),
    price: priceSchema.required(),
    stock: stockSchema.required(),
    category_id: categoryIdSchema.required(),
    status: statusSchema.required(),
    created_at:createdAtSchema,
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