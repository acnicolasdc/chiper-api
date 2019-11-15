const Joi = require('@hapi/joi');

const walletIdSchema = Joi.string();

// Atributes to validate
const currentValueSchema = Joi.number().min(0);
const userIdSchema = Joi.string();

const createWalletSchema = Joi.object({
    current_value: currentValueSchema.required(),
    user_id: userIdSchema.required(),
});

const updateWalletSchema = Joi.object({
    current_value: currentValueSchema,
    user_id: userIdSchema,
});

module.exports = {
    walletIdSchema,
    createWalletSchema,
    updateWalletSchema
};