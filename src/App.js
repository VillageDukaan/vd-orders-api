import express from "express";
import cors from "cors";

export const App = () => {
  const app = express();

  app.use(cors());

  app.get("/", (req, res) => res.sendStatus(200));

  return app;
};
