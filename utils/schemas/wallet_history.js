const Joi = require('@hapi/joi');

const walletHistoryIdSchema = Joi.string();

// Atributes to validate
const positiveSchema = Joi.boolean();
const valueSchema = Joi.number().min(0);
const dateSchema = Joi.date();
const walletCodeSchema = Joi.string();
const walletIdSchema = Joi.string();

const createWalletHistorySchema = Joi.object({
    positive: positiveSchema.require(),
    value: valueSchema.require(),
    date: dateSchema.require(),
    wallet_code: walletCodeSchema.required(),
    wallet_id: walletIdSchema.required(),
});

const updateWalletHistorySchema = Joi.object({
    positive: positiveSchema,
    value: valueSchema,
    date: dateSchema,
    wallet_code: walletCodeSchema,
    wallet_id: walletIdSchema,
});

module.exports = {
    walletHistoryIdSchema,
    createWalletHistorySchema,
    updateWalletHistorySchema
};