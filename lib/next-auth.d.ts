import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `getSession` and `useSession`
   */
  interface Session {
    user: {
      /** The user's access token */
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    /** The user's access token */
    accessToken?: string;
  }

  interface User extends DefaultUser {
    /** The user's access token */
    accessToken?: string;
  }
}
