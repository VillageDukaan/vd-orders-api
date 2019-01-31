import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import firebase from "firebase";
import firebaseAdmin from "firebase-admin";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/query";
import { checkAuth, login, signup } from "./helpers/auth";

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = opts => {
  const { config, database } = opts;
  const { isDevelopment } = config;
  const app = express();

  app.locals.config = config;
  app.locals.database = database;
  app.locals.firebase = firebase.initializeApp(config.firebase);
  app.locals.firebaseAdmin = firebaseAdmin.initializeApp(config.firebase);

  app.use(express.json());
  app.use(/\/((?!login|signup).)*/, checkAuth);

  const server = new ApolloServer({
    schema,
    path: config.graphQl.path,
    playground: isDevelopment,
    context: () => ({ config, database })
  });
  server.applyMiddleware({ app, cors: isDevelopment });

  app.get("/", (req, res) => res.sendStatus(200));
  app.post("/login", login);
  app.post("/signup", signup);

  return app;
};
