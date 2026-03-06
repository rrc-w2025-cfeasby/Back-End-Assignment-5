import fs from "fs";
import { generateSwaggerSpec } from "../config/swaggerConfig";

const specs = generateSwaggerSpec();

fs.writeFileSync("./openapi.json", JSON.stringify(specs, null, 2));

console.log("OpenAPI specification generated successfully!");