import getPrismaClient from "@/lib/getPrismaClient";

export const createContext = async () => {
  const prismaClient = getPrismaClient();
  return {
    prismaClient,
  };
};
export type Context = ReturnType<typeof createContext>;
