import { DefaultSession, DefaultUser } from "next-auth";

// Extend built-in types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      avatar?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    avatar?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    avatar?: string | null;
  }
}
