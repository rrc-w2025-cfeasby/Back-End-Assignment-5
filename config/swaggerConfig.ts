import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Back-End Assignment 5 API Documentation",
            version: "1.0.0",
            description: "API documentation for the Events API (Assignment 5).",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server",
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"], // JSDoc route comments
};

export const generateSwaggerSpec = (): object => {
    return swaggerJsdoc(swaggerOptions);
};