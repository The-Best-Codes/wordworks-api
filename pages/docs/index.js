import { SwaggerUI } from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import swaggerJsdoc from "swagger-jsdoc";

// Define your Swagger/OpenAPI specification
const swaggerSpecification = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "This is the API documentation for my Next.js app.",
    },
  },
  apis: ["./pages/api/**/*.js"],
});

const ApiDocsPage = () => {
  return (
    <div>
      <SwaggerUI spec={swaggerSpecification} />
    </div>
  );
};

export default ApiDocsPage;
