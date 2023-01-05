import NextAuth, { NextAuthOptions } from "next-auth";
import clientPromise from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser, User } from "../../../schemas/user.schema";
import connect from "../../../lib/mongoose";
import { verifyPassword } from "../../../lib/auth";
import { UserDto } from "../../../dto/user.dto";

let userAccount: UserDto = null;

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "MongoDB",
      credentials: {
        username: {
          label: "Vartotojo vardas:",
          type: "text",
          placeholder: "Vartotojo vardas",
        },
        password: {
          label: "Slaptažodis:",
          type: "password",
          placeholder: "Slaptažodis",
        },
      },
      async authorize(credentials, req) {
        await connect();
        const user: IUser = await User.findOne({
          username: credentials.username,
        });

        if (!user) {
          throw new Error("Toks vartotojas nerastas!");
        }
        const isAuthenticated = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isAuthenticated) throw new Error("Negeras slaptažodis");
        userAccount = {
          email: user.email,
          name: user.name,
          surname: user.surname,
          username: user.username,
          profile_picture: user.profile_picture,
          role: user.role,
        };
        return userAccount as any;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // one hour
    updateAge: 10 * 60,
  },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (userAccount !== null) {
        session.user = userAccount;
        return session;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          typeof session.user !== typeof undefined)
      )
        session.user = token.user as any;
      else if (typeof token !== typeof undefined) session.token = token;

      return session;
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
