import prisma from "@/utils/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User } from "next-auth";
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
    interface Session {
        user: User & {isAdmin: boolean}
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: boolean
    }
}

const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        })
    ],
    callbacks: {
        async session({token, session}){
            if(token){
                session.user.isAdmin = token.isAdmin;
            }
            return session;
        },
        async jwt({token}){
            const userInDb = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            });

            token.isAdmin = userInDb?.isAdmin!;
            return token;
        },
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

export const getAuthSession = () => getServerSession(authOptions)

