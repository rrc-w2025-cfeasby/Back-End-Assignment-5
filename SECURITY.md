## Helmet.js Configuration

### Configuration Applied

\`\`\`

app.use(
  helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    noSniff: true,
    hsts: process.env.NODE_ENV === "development"
      ? false
      : {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
    frameguard: { action: "deny" },
    referrerPolicy: { policy: "no-referrer" },
  })
);

\`\`\`

### Justification

1. **contentSecurityPolicy: false** - Disabled because this API returns only
   JSON data and does not serve HTML content. CSP is designed to prevent XSS in
   browsers rendering HTML. Disabling this avoids conflicts with tools like Swagger UI while posing no risk to a JSON-only API.

2. **hidePoweredBy: true** - Removes the X-Powered-By header to avoid revealing Express as the 
   backend framework. This reduces information disclosure that could help attackers target known Express vulnerabilities.
   
3. **noSniff: true** - Enables X-Content-Type-Options: nosniff, preventing browsers from    
   MIME-sniffing responses. This protects against attacks where malicious files are interpreted as executable content.

4. **hsts** - Enabled with 1-year max-age to enforce HTTPS connections for production      
   environments. This prevents protocol-downgrade attacks and ensures clients always use secure connections. Disabled in development to avoid issues with localhost.

5. **frameguard: { action: "deny" }** - Prevents the API from being embedded in iframes,  
   mitigating clickjacking attacks.

6. **referrerPolicy: "no-referrer"** - Ensures no referrer information is leaked to external 
   sites. This reduces metadata exposure and protects sensitive URLs. 

### Sources

1. Helmet.js Official Documentation - https://helmetjs.github.io/
2. OWASP recommends minimizing fingerprinting and technology disclosure - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
3. Helmet documentation and OWASP Secure Headers guidance - https://helmetjs.github.io/
4. OWASP Secure Headers Project - https://owasp.org/www-project-secure-headers/
5. OWASP X-Frame-Options guidance - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
6. MDN and OWASP recommendations for strict referrer policies - https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html

## Cors.js Configuration

### Configuration Applied

\`\`\`

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

\`\`\`

### Justification

1. **Environment-based behavior** 
   - Development allows all origins (origin: true) to simplify 
     local testing.
   - Production restricts origins using ALLOWED_ORIGINS from .env, ensuring only trusted    
     front-end clients (e.g. GitHub Pages) can access the API.

2. **Restricted methods (GET, POST, PUT, DELETE)** - Limits the attack surface by explicitly     
   allowing only the HTTP verbs used by the API.

3. **Restricted headers (Content-Type, Authorization)** - Prevents clients from sending 
   unexpected or dangerous headers.

4. **credentials: true** - Allows cookies or authorization headers when needed, but only from   
   approved origins in production.

### Sources

- MDN Web Docs - CORS Overview - Explains how CORS protects APIs by restricting cross-origin   
  requests.

- OWASP CORS Security Guidelines - Recommends strict origin whitelisting and limiting allowed  
  methods/headers.

- Both: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html