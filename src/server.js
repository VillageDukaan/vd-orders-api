import config from "config";
import { Pool } from "pg";
import * as Sentry from "@sentry/node";
import Rollbar from "rollbar";

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

const app = App({ config, database, rollbar });

app.listen(config.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${config.port}`);
});
