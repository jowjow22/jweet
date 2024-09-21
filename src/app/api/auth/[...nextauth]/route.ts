import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/utils/env";
import { prisma } from "../../database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      return true;
    },
  },
});

export { handler as GET, handler as POST };
