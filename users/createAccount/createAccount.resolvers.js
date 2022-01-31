import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("This username or email is already taken.");
        }

        const user = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: await bcrypt.hash(password, 5),
          },
        });
        return { ok: true };
      } catch (error) {
        return error;
      }
    },
  },
};
