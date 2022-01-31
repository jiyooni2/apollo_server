import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) return { ok: false, error: "Can't unfollow user" };

        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });

        return { ok: true };
      }
    ),
  },
};
