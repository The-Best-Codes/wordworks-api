// pages/api/swagger.js
import swaggerJsdoc from "swagger-jsdoc";

export default function handler(req, res) {
  const swaggerSpecification = swaggerJsdoc({
    // Your configuration here
  });

  res.status(200).json(swaggerSpecification);
}
