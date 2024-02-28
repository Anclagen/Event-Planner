import { sortAndPaginationSchema } from "@/noroff-api-utils";
import { z } from "zod";
import { mediaProperties, profileCore, profileMedia } from "../../auth/auth.schema";

// Schema for updating a user profile, mainly focusing on media aspects like avatar and banner.
export const updateProfileSchema = z.object(profileMedia);

// Schema for a single notification. Should move to notifications schema file.
// Includes ID, type, message, creation and update times,
// and optional related event instance and venue.
const notification = z.object({
  id: z.string().uuid(),
  type: z.string(),
  message: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  eventInstance: z.object({ id: z.string().uuid(), name: z.string(), startsAt: z.date() }).optional(),
  venue: z.object({ id: z.string().uuid(), name: z.string() }).optional(),
});

const ticket = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().int(),
  eventInstance: z.object({
    id: z.string().uuid(),
    name: z.string(),
    startsAt: z.date(),
    venue: z.object({
      id: z.string().uuid(),
      name: z.string(),
      address: z.object({ line1: z.string(), line2: z.string(), city: z.string(), country: z.string(), postcode: z.string(), googleMapsLink: z.string().url() }),
    }),
  }),
});

const eventNotification = {
  unread: z.array(notification),
  read: z.array(notification),
};

// Schema for the event planner's profile.
// Includes arrays for venues owned and managed, tickets,
// unread and read notifications, and money field.
const profileEventPlanner = {
  venuesOwned: z.array(z.object({ id: z.string().uuid(), name: z.string(), description: z.string().nullish(), promoImage: z.object(mediaProperties).nullish() })),
  venuesManaged: z.array(z.object({ id: z.string().uuid(), name: z.string(), description: z.string().nullish(), promoImage: z.object(mediaProperties).nullish() })),
  tickets: z.array(ticket),
  money: z.number().int(),
  ...eventNotification,
};

// Complete schema for event planner profile.
export const profileEventPlannerSchema = z.object(profileEventPlanner);

// Schema for creating a new user profile.
// Extends the core profile details with password requirements.
export const createProfileSchema = z.object({
  ...profileCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters"),
});

// Response schema for creating a profile, combining core profile details and event planner specifics.
export const createProfileResponseSchema = z.object({
  id: z.number(),
  ...profileCore,
  ...profileEventPlanner,
});

// Basic user profile schema.
export const profileSchema = z.object(profileCore);

// Schema for updating a user's name.
export const profileNameSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .trim(),
});

// Schema for displaying a user profile, including core and event planner details.
export const displayProfileSchema = z.object({
  ...profileCore,
  ...profileEventPlanner,
});

const queryFlagsCore = {
  _listings: z.preprocess((val) => String(val).toLowerCase() === "true", z.boolean()).optional(),
  _wins: z.preprocess((val) => String(val).toLowerCase() === "true", z.boolean()).optional(),
};

export const searchQuerySchema = sortAndPaginationSchema.extend(queryFlagsCore).extend({
  q: z.string({ required_error: "Query is required", invalid_type_error: "Query must be a string" }).nonempty("Query cannot be empty"),
});

export const queryFlagsSchema = z.object(queryFlagsCore);

export const profilesQuerySchema = sortAndPaginationSchema.extend(queryFlagsCore);

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
