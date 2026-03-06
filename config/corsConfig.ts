export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";
    
    // To learn when the mode is different, we can log it
    console.log("CORS mode:", isDevelopment ? "Development (allow all)" : "Production (restricted)");
    
    if (isDevelopment) {
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
    }
    
    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};