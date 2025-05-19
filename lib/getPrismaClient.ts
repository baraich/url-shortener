import { PrismaClient } from "./generated/prisma";

let prismaClient: PrismaClient | null = null;

export default function getPrismaClient(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient();
  }

  return prismaClient;
}
