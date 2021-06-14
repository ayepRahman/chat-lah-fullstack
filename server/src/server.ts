import "reflect-metadata";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { getSchema } from "schemas";
import { mongooseConnect } from "config/database";
import logger, { LogMessageType } from "utils/logger";
import { PORT } from "constants/env";

const bootstrap = async () => {
  try {
    // create mongodb connection
    await mongooseConnect();
    const schema = await getSchema();
    const app: express.Application = express();
    const server = new ApolloServer({
      schema,
      context: ({ req, res }: any) => ({ req, res }),
      subscriptions: {
        path: "/subscriptions",
        // @args - connectionParams, webSocket, context
        onConnect: () => {
          logger(LogMessageType.SUCCESS, "Connected!");
        },
        // @args - webSocket, context
        onDisconnect: () => {
          logger(LogMessageType.WARNING, "Disconnected!");
        },
      },
    });
    // initialize expess app
    // applying middle for our express app
    await server.start();
    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    await new Promise((resolve: any) => httpServer.listen(PORT, resolve));
    logger(
      LogMessageType.SUCCESS,
      `Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );

    logger(
      LogMessageType.SUCCESS,
      `Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
    );

    // app.listen({ port: 4000 }, () =>
    //   logger(
    //     LogMessageType.SUCCESS,
    //     `Server ready and listening at ==> http://localhost:4000${server.graphqlPath}`
    //   )
    // );
  } catch (error) {
    logger(LogMessageType.FAILURE, error);
  }
};
// bootstrap our main server.js
bootstrap();
