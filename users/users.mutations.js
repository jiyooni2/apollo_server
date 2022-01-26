import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      const existingUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      const user = await client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: await bcrypt.hash(password, 5),
        },
      });
      console.log(user);
      return user;
    },
  },
};
