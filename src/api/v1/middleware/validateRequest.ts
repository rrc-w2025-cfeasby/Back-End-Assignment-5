import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Validate Request Middleware
 * 
 * Validates the request body against the provided Joi schema.
 * If validation fails, responds with a 400 status and error details.
 * If validation succeeds, attaches the validated value to req.body and calls next().
 *  
 * @param schema 
 * @returns Express middleware function
 */
export function validateRequest(schema: { body ?: Joi.ObjectSchema }) {
    return (req: Request, res: Response, next: NextFunction): void => {
        if(!schema.body) {
            return next();
        }

        const { error, value } = schema.body.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if(error){
            res.status(400).json({
                errors: error.details.map(detail => detail.message)
            });
            return;
        }

        req.body = value;
        next();
    };
};