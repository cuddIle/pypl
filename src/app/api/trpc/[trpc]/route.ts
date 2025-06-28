import { appRouter } from "@/app/api/routers/app-router";
import { createContext } from "@/common/trpc/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import "reflect-metadata";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
}

export async function POST(req: Request) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
}
