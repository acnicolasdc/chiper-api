const Joi = require('@hapi/joi');

const walletCouponIdSchema = Joi.string();

// Atributes to validate
const codeSchema = Joi.string();
const valueSchema = Joi.number().min(0);
const limitSchema = Joi.number().min(0);
const dateLimitSchema = Joi.date().timestamp();

const createWalletCouponSchema = Joi.object({
    code: codeSchema.require(),
    value: valueSchema.required(),
    limit: limitSchema.required(),
    date_limit: dateLimitSchema.required(),
});

const updateWalletCouponSchema = Joi.object({
    code: codeSchema,
    value: valueSchema,
    limit: limitSchema,
    date_limit: dateLimitSchema,
});

module.exports = {
    walletCouponIdSchema,
    createWalletCouponSchema,
    updateWalletCouponSchema
};