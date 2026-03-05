import Joi from "joi";

/**
 * Joi Schema for Creating an Event
 * Validates the structure and constraints of the event creation request body.
 * 
 * Fields:
 * - name: string, required, min length 3
 * - date: ISO date string, required, must be in the future
 * - capacity: integer, required, min value 5
 * - registrationCount: integer, optional, min value 0, max value equal to capacity, default 0
 * - status: string, optional, one of ["active", "cancelled", "completed"], default "active"
 * - category: string, optional, one of ["conference", "workshop", "meetup", "seminar", "general"], default "general"
 * 
 * @returns Joi.ObjectSchema
 */
export const createEventSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "any.required": `"name" is required`,
            "string.empty": `"name" is required`,
            "string.min": `"name" length must be at least 3 characters long`,
        }),

    date: Joi.date()
        .iso()
        .greater("now")
        .required()
        .messages({
            "any.required": `"date" is required`,
            "date.base": `"date" must be a valid ISO date`,
            "date.format": `"date" must be a valid ISO date`,
            "date.greater": `"date" must be greater than "now"`,
        }),

    capacity: Joi.number()
        .integer()
        .min(10)
        .required()
        .messages({
            "any.required": `"capacity" is required`,
            "number.base": `"capacity" must be a number`,
            "number.integer": `"capacity" must be an integer`,
            "number.min": `"capacity" must be greater than or equal to 10`,
        }),

    registrationCount: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .max(Joi.ref("capacity"))
        .messages({
            "number.base": `"registrationCount" must be a number`,
            "number.integer": `"registrationCount" must be an integer`,
            "number.max": `"registrationCount" must be less than or equal to ref:capacity`,
        }),

    status: Joi.string()
        .valid("active", "cancelled", "completed")
        .default("active")
        .messages({
            "any.only": `"status" must be one of [active, cancelled, completed]`,
        }),

    category: Joi.string()
        .valid("conference", "workshop", "meetup", "seminar", "general")
        .default("general")
        .messages({
            "any.only": `"category" must be one of [conference, workshop, meetup, seminar, general]`,
        }),
});

/**
 * Event Schemas Collection
 * 
 * Groups all event-related Joi schemas for easy access.
 */
export const eventSchemas: { 
    create: { body: Joi.ObjectSchema } 
} = {
    create: {
        body: createEventSchema,
    },
};