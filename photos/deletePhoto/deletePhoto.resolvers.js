import { protectedResolver } from "../../users/users.utils";
import client from "./../../client";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: {
          id,
        },
        select: { userId: true },
      });

      //CASCADE로 comment같은 것 삭제하게 설정하기

      if (!photo) {
        return { ok: false, error: "Photo not found" };
      } else if (photo.userID !== loggedInUser.id) {
        return { ok: false, error: "Not authorized" };
      } else {
        await client.photo.delete({ where: { id } });
      }

      return { ok: true };
    }),
  },
};
