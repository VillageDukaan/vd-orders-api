import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import firebase from "firebase";
import firebaseAdmin from "firebase-admin";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/query";
import { config } from "./config/firebase";
import { checkAuth, login, signup } from "./helpers/auth";

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = ({ graphQlEndpoint = "/graphql", isDevelopment = true }) => {
  const app = express();

  app.locals.firebase = firebase.initializeApp(config);
  app.locals.firebaseAdmin = firebaseAdmin.initializeApp(config);

  app.use(express.json());
  app.use(/\/((?!login|signup).)*/, checkAuth);

  const server = new ApolloServer({
    schema,
    path: graphQlEndpoint,
    playground: isDevelopment
  });
  server.applyMiddleware({ app, cors: isDevelopment });

  app.get("/", (req, res) => res.sendStatus(200));
  app.post("/login", login);
  app.post("/signup", signup);

  return app;
};
