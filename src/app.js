const express = require("express");

const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server-express");

const connectToDB = require("./models/index.js");
const resolvers = require("./resolvers/resolver.js");

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectToDB();

  const app = express();

  const server = new ApolloServer({
    typeDefs: [
      gql(fs.readFileSync(__dirname.concat("/schemas/schema.gql"), "utf8")),
      //gql(fs.readFileSync(__dirname.concat("/schemas/schema.gql"), "utf8")),
    ],
    resolvers,
  });
  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () => {
    console.log("server start", PORT, server.graphqlPath);
  });
}

startServer();
