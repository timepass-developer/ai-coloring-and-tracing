// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";
import { resolve } from "path";

// ✅ Explicitly load your .env before Prisma reads it
dotenv.config({ path: resolve(process.cwd(), ".env") });

const resolvedDatabaseUrl = process.env.DATABASE_URL2 ?? process.env.DATABASE_URL ?? "";

if (!resolvedDatabaseUrl) {
  throw new Error(
    "Prisma configuration error: DATABASE_URL2 (or legacy DATABASE_URL) must be set."
  );
}

// Normalize to DATABASE_URL for Prisma consumption.
process.env.DATABASE_URL = resolvedDatabaseUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
