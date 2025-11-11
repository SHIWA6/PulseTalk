import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signUpSchema, signInSchema } from "./zod";
import { Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";


async function checkIfEmailUsedWithGoogle(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user && !user.password) {
    throw new Error("This email is registered with Google. Please sign in with Google.");
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),

    CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "johndoe@example.com" },
    password: { label: "Password", type: "password" },
    confirmPassword: { label: "Confirm Password", type: "password", optional: true },
  },
  async authorize(credentials): Promise<User | null> {
    if (!credentials) throw new Error("Missing credentials");

    const { email, password, confirmPassword } = credentials as {
      email: string;
      password: string;
      confirmPassword?: string;
    };

    if (!email || !password) throw new Error("Email and password are required.");
    await checkIfEmailUsedWithGoogle(email);

    // ✅ SIGN-UP FLOW
    if (confirmPassword) {
      signUpSchema.parse({ email, password, confirmPassword });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("Email already registered.");

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          avatar: "/avatar.png",
        },
      });

      return {
        id: newUser.id,
        email: newUser.email!,
        avatar: newUser.avatar ?? "/avatar.png",
        name: newUser.email?.split("@")[0] ?? "User",
      } as User; // ✅ force cast to NextAuth.User
    }

    // ✅ SIGN-IN FLOW
    signInSchema.parse({ email, password });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found.");
    if (!user.password)
      throw new Error("This account doesn't have a password. Please sign in with Google.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password.");

    return {
      id: user.id,
      email: user.email!,
      avatar: user.avatar ?? "/avatar.png",
      name: user.email?.split("@")[0] ?? "User",
    } as User;
  },
}),

  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async signIn({
      user,
      account,
    }: {
      user: User;
      account: Account | null;
    }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });
          
          const googleAvatarUrl = user.image || "";
          
          if (!existingUser) {

            await prisma.user.create({
              data: {
                email: user.email!,
                avatar: googleAvatarUrl,
              }
            });
            
            return true;
          } else {

            await prisma.user.update({
              where: { id: existingUser.id },
              data: { avatar: googleAvatarUrl }
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({
  token,
  user,
  account,
  profile,
}: {
  token: JWT;
  user?: User | null;
  account?: Account | null;
  profile?: Profile | null;
}) {
  if (user) {
    token.id = user.id;
    token.email = user.email;

    // 👇 Safely cast to handle Google’s `picture` property
    const googleProfile = profile as { picture?: string } | null;

    if (account?.provider === "google" && googleProfile?.picture) {
      token.avatar = googleProfile.picture;
    } else {
      token.avatar = user.avatar;
    }
  }
  return token;
},


    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }: { url?: string; baseUrl: string }) {
      if (url && url.startsWith(baseUrl)) {
        return url;
      }
      
      if (url && url.startsWith('/')) {
        return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;
      }
      
      return `${baseUrl}/home`;
    },
  },
  
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
};