const Joi = require('@hapi/joi');

const productAttributeCategoryIdSchema = Joi.string();
// Atributes to validate
const nameSchema = Joi.string().min(2);
const productAttributeIdSchema = Joi.string();

const createProductAttributeCategorySchema = Joi.object({
    name: nameSchema.required(),
    product_attribute_id: productAttributeIdSchema.required()
});

const updateProductAttributeCategorySchema = Joi.object({
    name: nameSchema,
    product_attribute_id: productAttributeIdSchema
});

module.exports = {
    productAttributeCategoryIdSchema,
    createProductAttributeCategorySchema,
    updateProductAttributeCategorySchema
};