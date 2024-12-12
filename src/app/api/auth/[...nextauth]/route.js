import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

const AUTH_OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text", placeholder: "Phone" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        const user = await prisma.user.findUnique({
          where: {
            phone: credentials.phone,
          },
        });

        console.log("user", user);

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          phone: user.phone,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/gallery`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(AUTH_OPTIONS);

export { handler as GET, handler as POST };
