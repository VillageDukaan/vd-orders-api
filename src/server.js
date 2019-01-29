import { App } from "./app";

const port = process.env.PORT || 4000;
const isDevelopment = "production" !== process.env.NODE_ENV;
const opts = { isDevelopment, port };
const app = App(opts);

app.listen(opts.port, () => {
  /* eslint-disable */
  console.log(`Server: http://localhost:${opts.port}`);
});
