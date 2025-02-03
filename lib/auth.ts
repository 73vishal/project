import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserModel from "../models/User";
import { connetToDatabase } from "./db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email:{label:"Email", Type:"text"},
                password:{label:"password", type:"password"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials.password){
                    throw new Error("Invalid credentials")
                }

                try {
                    await connetToDatabase();
                    const user = await UserModel.findOne({email: credentials.email});

                    if(!user) {
                        throw new Error("No user found with this email");
                    }

                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if(!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        role: user.role,
                    };
                } catch (error) {
                    console.log("Auth Error",error);
                    throw error
                    
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({session, token}) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn:"/login",
        error:"/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

