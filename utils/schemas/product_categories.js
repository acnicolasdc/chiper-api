const Joi = require('@hapi/joi');

const productCategoriesIdSchema = Joi.string();
// Atributes to validate
const nameSchema = Joi.string().min(2);
const imageSchema = Joi.string().uri();

const createProductCategoriesSchema = Joi.object({
    name: nameSchema.required(),
    image: imageSchema.required(),
});

const updateProductCategoriesSchema = Joi.object({
    name: nameSchema,
    image: imageSchema,
});

module.exports = {
    productCategoriesIdSchema,
    createProductCategoriesSchema,
    updateProductCategoriesSchema
};