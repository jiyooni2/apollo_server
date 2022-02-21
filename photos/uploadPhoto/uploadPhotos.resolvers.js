import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { processHashtag } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObj;
        if (caption) {
          //parse caption, get/create hashtags
          //simple regex
          hashtagObj = processHashtag(caption);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: { connect: { id: loggedInUser.id } },
            ...(hashtagObj && {
              hashtags: {
                //if exists, connect
                connectOrCreate: hashtagObj,
              },
            }),
          },
        });
        //save photo

        //add the photo to hashtag
      }
    ),
  },
};
