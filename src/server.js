import config from "config";
import { Pool } from "pg";
import * as Sentry from "@sentry/node";
import Rollbar from "rollbar";

import { logger } from "./helpers/logger";

var rollbar = new Rollbar({
  accessToken: config.rollbar.accessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV
});

Sentry.init({
  dsn: config.sentry.dsn,
  environment: process.env.NODE_ENV
});

import { App } from "./app";

const database = new Pool({
  connectionString: config.postgresql.url
});

const app = App({ config, database, rollbar, logger });

app.listen(config.port, () => {
  logger.log(`Server: http://localhost:${config.port}`);
});
