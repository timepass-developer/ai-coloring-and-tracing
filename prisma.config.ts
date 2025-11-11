// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";
import { resolve } from "path";

// ✅ Explicitly load your .env before Prisma reads it
dotenv.config({ path: resolve(process.cwd(), ".env") });

const resolvedDatabaseUrl =
  process.env.DATABASE_URL ?? process.env.DATABASE_URL2 ?? "";

if (!resolvedDatabaseUrl) {
  throw new Error(
    "Prisma configuration error: DATABASE_URL or DATABASE_URL2 must be set."
  );
}

// Copy the resolved URL into both env vars so downstream tools can rely on either key.
process.env.DATABASE_URL = resolvedDatabaseUrl;
process.env.DATABASE_URL2 = resolvedDatabaseUrl;

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
