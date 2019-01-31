import config from "config";

import { App } from "./app";

const app = App(config);

app.listen(config.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${config.port}`);
});
