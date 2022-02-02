import { protectedResolver } from "../../users/users.utils";
import photosTypeDefs from "../photos.typeDefs";
import client from "./../../client";
import { processHashtag } from "./../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          include: { hashtags: { select: { hashtag: true } } },
        });
        //photo의 소유주와 로그인한 사람이 다른 경우
        if (photo.userId !== loggedInUser.id) {
          return { ok: false, error: "Photo not found" };
        }

        const updatedPhoto = await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: photo.hashtags,
              connectOrCreate: processHashtag(caption),
            },
          },
        });

        return { ok: true };
      }
    ),
  },
};
