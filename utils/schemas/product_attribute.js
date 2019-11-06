const Joi = require('@hapi/joi');

const productAttributeIdSchema = Joi.string();
// Atributes to validate
const nameSchema = Joi.string().min(2);
const imageSchema = Joi.string().dataUri();
const priceSchema = Joi.number().min(5);
const productIdSchema = Joi.string();

const createProductAttributeSchema = Joi.object({
    name: nameSchema.require(),
    image: imageSchema.require(),
    price: priceSchema.required(),
    product_id: productIdSchema.required()
});

const updateProductAttributeSchema = Joi.object({
    name: nameSchema,
    image: imageSchema,
    price: priceSchema,
    product_id: productIdSchema
});

module.exports = {
    productAttributeIdSchema,
    createProductAttributeSchema,
    updateProductAttributeSchema
};