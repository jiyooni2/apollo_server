import { protectedResolver } from "../../users/users.utils";
import client from "../../client";
import { processHashtag } from "../photos.utils";
import { uploadToS3 } from "../../shared/shared.utils";

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
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        console.log(fileUrl);
        return client.photo.create({
          data: {
            file: fileUrl,
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
