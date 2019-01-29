import { App } from "./src/App";

const port = process.env.APP_PORT || 4000;
const isDevelopment = "production" !== process.env.NODE_ENV;
const opts = { isDevelopment, port };
const app = App(opts);

app.listen(opts.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${opts.port}`);
});
