// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import * as dotenv from "dotenv";
import { resolve } from "path";

// ✅ Explicitly load your .env before Prisma reads it
dotenv.config({ path: resolve(process.cwd(), ".env") });

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
