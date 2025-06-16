import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./src/server/migrations",
  dialect: "singlestore",
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    database: env.SINGLESTORE_DATABASE,
    ssl: {},
  },
  tablesFilter: ["DeckSwap_*"],
  verbose: true,
  strict: true,
});
