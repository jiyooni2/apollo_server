import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const user = await client.user.findUnique({
        where: { username },
        //user의 존재유무만 파악하기 위해서
        select: { id },
      });

      if (!user) {
        return { ok: false, error: "no user" };
      }

      //can take all the followers using followers()
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });
      console.log(followers);

      const totalFollowers = await client.user.count({
        where: { following: { some: username } },
      });

      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};
