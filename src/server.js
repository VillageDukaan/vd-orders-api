import config from "config";
import { Pool } from "pg";

import { App } from "./app";

const database = new Pool({
  connectionString: config.postgresql.url
});

const app = App({ config, database });

app.listen(config.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${config.port}`);
});
