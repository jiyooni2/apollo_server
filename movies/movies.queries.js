import client from "../client";

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) => {
      return client.movie.findUnique({
        where: { id },
      });
    },
  },
};

export default resolvers;
