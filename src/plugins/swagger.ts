import swagger from "@fastify/swagger";
import fp from "fastify-plugin";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

import { version } from "../../package.json";

export default fp(async (fastify) => {
  fastify.register(swagger, {
    swagger: {
      info: {
        title: "Noroff API",
        description: "Noroff API to be used in assignments",
        version,
      },
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [
        { name: "status", description: "Health check endpoint" },
        { name: "auth", description: "Auth related endpoints" },
        { name: "auction-profiles", description: "Auction profiles related endpoints" },
        { name: "auction-listings", description: "Auction listings related endpoints" },
      ],
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "API Key",
          in: "header",
          description: 'Format "X-Noroff-API-Key [key]"',
        },
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
          description: 'Format "Bearer [token]"',
        },
      },
    },
    transform: jsonSchemaTransform,
  });
});
