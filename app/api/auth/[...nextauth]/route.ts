import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // No database for now — use JWT session strategy
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin", // redirect custom sign-in page if you have one
  },
})

export { handler as GET, handler as POST }
