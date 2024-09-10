import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Check if this is the first time the user signs in
      if (account) {
        // Cast `account.access_token` to a string, as it might be inferred as `unknown`
        token.accessToken = account.access_token as string | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure token.accessToken is a string or undefined, and assign it to the session object
      session.user.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
});
