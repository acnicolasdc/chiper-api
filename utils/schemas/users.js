const Joi = require('@hapi/joi');

const userIdSchema = Joi.string();

// Atributes to validate
const firstNameSchema = Joi.string().min(3);
const lastNameSchema = Joi.string().min(3);
const phoneSchema = Joi.number().min(7).max(12);
const emailSchema = Joi.string().email();;
const addressSchema = Joi.string().min(5);
const createdAtSchema = Joi.date().timestamp();


const createUserSchema = Joi.object({
    first_name: firstNameSchema.required(),
    last_name: lastNameSchema.required(),
    phone: phoneSchema.required(),
    email: emailSchema.required(),
    address: addressSchema.required(),
    created_at:createdAtSchema.required(),
});

const updateUserSchema = Joi.object({
    first_name: firstNameSchema,
    last_name: lastNameSchema,
    phone: phoneSchema,
    email: emailSchema,
    address: addressSchema,
    created_at:createdAtSchema,
});

module.exports = {
    userIdSchema,
    createUserSchema,
    updateUserSchema
};