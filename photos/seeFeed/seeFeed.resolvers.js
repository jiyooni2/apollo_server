import { protectedResolver } from "../../users/users.utils";
import client from "./../../client";

export default {
  Query: {
    seeFeed: protectedResolver((_, __, { loggedInUser }) => {
      client.photo.findMany({
        where: {
          //사진의 소유자(유저)의 팔로워에 내가 있으면 보여줌
          OR: [
            {
              user: {
                followers: { some: { id: loggedInUser.id } },
              },
            },
            //내가 만든 사진도 피드에 보임
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  },
};
