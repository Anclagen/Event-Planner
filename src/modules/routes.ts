import type { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
  fastify.register(import("./status/status.route"), { prefix: "status" });
  fastify.register(import("./auth/auth.route"), { prefix: "auth" });
  fastify.register(import("./auction/listings/listings.route"), { prefix: "auction/listings" });
  fastify.register(import("./auction/profiles/profiles.route"), { prefix: "auction/profiles" });
}
