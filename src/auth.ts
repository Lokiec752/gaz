import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user?.email === process.env.ADMIN_EMAIL) {
        token.isAdmin = true;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.isAdmin = !!token.isAdmin;
      return session;
    },
  },
});
