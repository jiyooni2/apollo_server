import { protectedResolver } from "../../users/users.utils";
import client from "./../../client";

export default {
  Query: {
    seePhotoLikes: protectedResolver(async (_, { id }) => {
      const photo = await client.photo.findUnique({ where: { id } });

      const users = await client.user.findMany({
        where: { likes: { some: { photoId: id } } },
        select: { username: true },
      });

      return users;
    }),
  },
};
