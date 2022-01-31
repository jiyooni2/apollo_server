require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import logger from "morgan";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  //모든 resolver에서 user auth X, context로 한번만
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("dev"));
app.use("static", express.static("uploads"));

//attach Apollo server to an Express server
apollo.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () =>
  console.log(`server is listening on https://localhost:${PORT}/`)
);
