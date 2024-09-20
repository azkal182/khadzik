import NextAuth, { CredentialsSignin } from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 432000 / 5
  },
  trustHost: true,
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        return {
          ...session,
          user: {
            id: token.sub,
            name: token.name,
            email: token.email
          }
        };
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }

      return token;
    }
  }
});
