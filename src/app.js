import express from "express";
import {
  ApolloServer,
  makeExecutableSchema,
  AuthenticationError
} from "apollo-server-express";
import firebase from "firebase";
import firebaseAdmin from "firebase-admin";
import { isNil } from "lodash";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/query";
import { login, signup, getToken } from "./helpers/auth";

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = opts => {
  const { config, database, rollbar, airBrake } = opts;
  const { isDevelopment } = config;
  const app = express();

  app.locals.config = config;
  app.locals.database = database;
  app.locals.rollbar = rollbar;
  app.locals.airBrake = airBrake;
  app.locals.firebase = firebase.initializeApp(config.firebase);
  app.locals.firebaseAdmin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: config.firebaseAdmin.projectId,
      privateKey: config.firebaseAdmin.privateKey.replace(/\\n/g, "\n"),
      clientEmail: config.firebaseAdmin.clientEmail
    })
  });

  app.use(express.json());

  const server = new ApolloServer({
    schema,
    path: config.graphQl.path,
    playground: isDevelopment,
    context: async ({ req }) => {
      const token = await getToken(req);
      if (isNil(token)) throw new AuthenticationError("You must be logged in");

      return { ...req.app.locals, user: token.user };
    }
  });
  server.applyMiddleware({ app, cors: isDevelopment });

  app.get("/", (req, res) => res.sendStatus(200));
  app.post("/login", login);
  app.post("/signup", signup);

  return app;
};
