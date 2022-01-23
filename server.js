require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT;

server
  .listen()
  .then(() => console.log(`server is listening on https://localhost:${PORT}/`));
