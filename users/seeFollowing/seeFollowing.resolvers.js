import client from "../../client";

export default {
  Query: {
    seeFollowing: async (_, { username, cursor }) => {
      const user = await client.user.findUnique({
        where: { username },
        //user의 존재유무만 파악하기 위해서
        select: { id: true },
      });

      if (!user) {
        return { ok: false, error: "no user" };
      }
      console.log(username, cursor);

      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
        });

      return { ok: true, following };
    },
  },
};
