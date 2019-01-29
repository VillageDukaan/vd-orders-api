import express from "express";
import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import { typeDefs } from "./schema";
import { Query } from "./resolvers/query";

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = ({ graphQlEndpoint = "/graphql", isDevelopment = true }) => {
  const app = express();

  const server = new ApolloServer({
    schema,
    path: graphQlEndpoint,
    playground: isDevelopment
  });
  server.applyMiddleware({ app, cors: isDevelopment });

  app.get("/", (req, res) => res.sendStatus(200));

  return app;
};
