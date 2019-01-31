import express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/query";
import { checkAuth, login, signup } from "./helpers/auth";

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = ({ graphQlEndpoint = "/graphql", isDevelopment = true }) => {
  const app = express();

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
