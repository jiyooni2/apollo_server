import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    followUser: protectedResolver(async (_, { username }, { loggedInUser }) => {
      const user = client.user.findUnique({ where: { username } });
      if (!user) return { ok: false, error: "That user does not exist." };

      await client.user.update({
        where: { id: loggedInUser.id },
        data: {
          following: {
            //only connect by unique field
            //find user in prisma
            connect: { username },
          },
        },
      });
      return { ok: true };
    }),
  },
};
