import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma CLI configuration. With a config file present Prisma no longer reads .env itself, hence dotenv.
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
});
