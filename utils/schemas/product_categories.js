const Joi = require('@hapi/joi');

const productCategoriesIdSchema = Joi.string();
// Atributes to validate
const nameSchema = Joi.string().min(2);
const imageSchema = Joi.string().dataUri();

const createProductCategoriesSchema = Joi.object({
    name: nameSchema.require(),
    image: imageSchema.require(),
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