/* eslint-disable no-console */
import * as Sentry from "@sentry/node";

export const logger = {
  log: console.log,
  error: error => {
    console.error(error);
    Sentry.captureException(error);
  }
};
