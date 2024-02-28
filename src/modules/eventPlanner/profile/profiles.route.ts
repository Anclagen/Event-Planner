import { FastifyInstance } from "fastify";
import { createResponseSchema } from "@/noroff-api-utils";
import { getProfilesHandler } from "./profiles.controller";
import { displayProfileSchema, profileEventPlannerSchema, profileNameSchema, profilesQuerySchema, queryFlagsSchema, searchQuerySchema, updateProfileSchema } from "./profiles.schema";

async function profilesEventRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      onRequest: [server.authenticate, server.apiKey],
      schema: {
        tags: ["event-planner-profiles"],
        security: [{ bearerAuth: [] }],
        querystring: profilesQuerySchema,
        response: {
          200: createResponseSchema(displayProfileSchema.array()),
        },
      },
    },
    getProfilesHandler
  );
}

export default profilesEventRoutes;
