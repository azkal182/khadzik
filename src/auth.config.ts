import NextAuth, { CredentialsSignin } from "next-auth";
import Credentails from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas/loginSchema";
import { compare, compareSync } from "bcryptjs";
import { db } from "./lib/db";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({ where: { email } });
  return user;
};
export default {
  providers: [
    Credentails({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        console.log({ credentials });

        const validated = LoginSchema.safeParse(credentials);
        if (!validated.success) {
          console.log(validated.error);

          throw new InvalidLoginError();
        }
        const { email, password } = validated.data;

        const user = await getUserByEmail(email);

        if (user) {
          //   compare password
          console.log({ password, hash: user.password });

          const passwordMatch = compareSync(password, user.password);
          if (passwordMatch) {
            return {
              ...user,
              id: user.id.toString()
            };
          }
          throw new InvalidLoginError();
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new InvalidLoginError();

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ]
} satisfies NextAuthConfig;
