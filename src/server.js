import config from "config";
import { Pool } from "pg";
import * as Sentry from "@sentry/node";

import { logger } from "./helpers/logger";

Sentry.init({
  dsn: config.sentry.dsn,
  environment: process.env.NODE_ENV
});

import { App } from "./app";

const database = new Pool({
  connectionString: config.postgresql.url,
  ssl: config.postgresql.ssl
});

const app = App({ config, database, logger });

app.listen(config.port, () => {
  logger.log(`Server: http://localhost:${config.port}`);
});
