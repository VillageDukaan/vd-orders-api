import express from 'express';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import morgan from 'morgan';

import { typeDefs } from './schema';
import { Query } from './resolvers/query';

const schema = makeExecutableSchema({ typeDefs, resolvers: { Query } });

export const App = opts => {
  const { config, database, logger } = opts;
  const { isDevelopment } = config;
  const app = express();

  app.locals.config = config;
  app.locals.database = database;
  app.locals.logger = logger;

  app.use(morgan('combined'));
  app.use(express.json());

  const server = new ApolloServer({
    schema,
    path: config.graphQl.path,
    playground: false,
    context: async ({ req }) => {
      return { ...req.app.locals };
    }
  });
  server.applyMiddleware({ app, cors: isDevelopment });

  app.get('/', (req, res) => res.sendStatus(200));

  return app;
};
