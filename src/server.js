import config from "config";
import { Pool } from "pg";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: config.sentry.dsn,
  environment: process.env.NODE_ENV
});

import { App } from "./app";

const database = new Pool({
  connectionString: config.postgresql.url
});

const app = App({ config, database });

app.listen(config.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${config.port}`);
});
