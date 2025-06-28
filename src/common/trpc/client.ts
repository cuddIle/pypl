"use client";

import { AppRouter } from "@/app/api/routers/app-router";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
});
