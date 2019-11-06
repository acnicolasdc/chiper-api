const Joi = require('@hapi/joi');

const userWalletCouponIdSchema = Joi.string();

// Atributes to validate
const userIdSchema = Joi.string();
const walletCouponIdSchema = Joi.string();

const createuserWalletCouponSchema = Joi.object({
    user_id: userIdSchema.required(),
    wallet_coupon_id: walletCouponIdSchema.required(),

});

const updateuserWalletCouponSchema = Joi.object({
    user_id: userIdSchema,
    wallet_coupon_id: walletCouponIdSchema,
});

module.exports = {
    userWalletCouponIdSchema,
    createuserWalletCouponSchema,
    updateuserWalletCouponSchema
};