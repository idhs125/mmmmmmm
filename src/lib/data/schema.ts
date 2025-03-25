import { z } from "zod";

// Member Types
export const MemberRole = {
  OWNER: "owner",
  LEADER: "leader",
  MEMBER: "member",
} as const;

export type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole];

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum([MemberRole.OWNER, MemberRole.LEADER, MemberRole.MEMBER]),
  joinedAt: z.date(),
  profileImage: z.string().optional(),
  discordUsername: z.string().optional(),
  description: z.string().optional(),
});

export type Member = z.infer<typeof memberSchema>;

// Server Status
export const ServerPlatform = {
  JAVA: "java",
  BEDROCK: "bedrock",
  POCKET: "pocket",
  WINDOWS: "windows",
} as const;

export type ServerPlatformType = (typeof ServerPlatform)[keyof typeof ServerPlatform];

export const serverStatusSchema = z.object({
  isOnline: z.boolean(),
  version: z.string(),
  lastUpdated: z.date(),
  supportedPlatforms: z.array(z.enum([ServerPlatform.JAVA, ServerPlatform.BEDROCK, ServerPlatform.POCKET, ServerPlatform.WINDOWS])),
  playerCount: z.number().optional(),
  maxPlayers: z.number().optional(),
});

export type ServerStatus = z.infer<typeof serverStatusSchema>;

// Rules
export const ruleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: z.string().optional(),
  important: z.boolean().default(false),
});

export type Rule = z.infer<typeof ruleSchema>;

// Join Request
export const joinRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  discordUsername: z.string().optional(),
  experience: z.string(),
  reason: z.string(),
  age: z.number(),
  platform: z.array(z.enum([ServerPlatform.JAVA, ServerPlatform.BEDROCK, ServerPlatform.POCKET, ServerPlatform.WINDOWS])),
  submittedAt: z.date(),
  status: z.enum(["pending", "approved", "rejected"]).default("pending"),
});

export type JoinRequest = z.infer<typeof joinRequestSchema>;

// Admin User
export const adminUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  passwordHash: z.string(),
  role: z.enum(["admin", "superadmin"]),
  createdAt: z.date(),
  lastLogin: z.date().optional(),
});

export type AdminUser = z.infer<typeof adminUserSchema>;
