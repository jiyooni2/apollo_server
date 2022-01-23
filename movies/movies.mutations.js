import client from "../client";

const resolvers = {
  Mutation: {
    createMovie: (_, { title, year, genre }) => {
      return client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      });
    },
    deleteMovie: (_, { id }) => {
      return client.movie.delete({ where: { id } });
    },
    updateMovie: (_, { id, year }) => {
      return client.movie.update({ where: { id }, data: { year } });
    },
  },
};

export default resolvers;
