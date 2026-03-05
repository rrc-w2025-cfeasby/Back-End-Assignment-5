/**
 * API Response Model
 * 
 * Defines the structure of API responses for consistency across the application.
 */
export interface ApiReposponse<T> {
    status: string;
    data?: T;
    message?: string;
    error?: string;
    code?: string;
};

/**
 * Success Response Helper Model
 * 
 * Generates a standardized success response object.
 * @param data - optional payload of the response
 * @param message - optional message providing additional context
 * @returns - ApiReposponse object with status "success"
 */
export function successResponse<T>(data?: T, message?: string): ApiReposponse<T> {
    return {
        status: "success",
        data,
        message
    };
};