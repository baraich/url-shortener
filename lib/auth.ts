import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import getPrismaClient from "./getPrismaClient";

export const auth = betterAuth({
  appName: "url-shortener",
  database: prismaAdapter(getPrismaClient(), {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 20,
  },
});
