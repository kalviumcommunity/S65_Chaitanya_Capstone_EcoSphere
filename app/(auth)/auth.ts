import { compareSync } from 'bcryptjs';
import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { createGuestUser, getUser, createUser } from '@/lib/db/queries';
import { authConfig } from './auth.config';
import { getDummyPassword } from '@/lib/constants';
import type { DefaultJWT } from 'next-auth/jwt';

export type UserType = 'guest' | 'regular';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      type: UserType;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    email?: string | null;
    type: UserType;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    type: UserType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    // 3rd-party OAuth provider: Google (uses GOOGLE_CLIENT_ID/SECRET)
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email);

        if (users.length === 0) {
          compareSync(password, getDummyPassword());
          return null;
        }

        const [user] = users;

        if (!user.password) {
          compareSync(password, getDummyPassword());
          return null;
        }

        const passwordsMatch = compareSync(password, user.password);

        if (!passwordsMatch) return null;

        return { ...user, type: 'regular' };
      },
    }),
    Credentials({
      id: 'guest',
      credentials: {},
      async authorize() {
        const [guestUser] = await createGuestUser();
        return { ...guestUser, type: 'guest' };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // OAuth flow: when provider is Google, ensure user exists in DB
      if (account?.provider === 'google' && user.email) {
        try {
          // Check if user exists
          const existingUsers = await getUser(user.email);
          
          if (existingUsers.length === 0) {
            // Provision user for OAuth: create DB record without password
            await createUser(user.email, null); // No password for OAuth users
          }
          
          return true;
        } catch (error) {
          console.error('OAuth sign-in error:', error);
          return false;
        }
      }
      
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Map OAuth (Google) user to DB user id/type on first sign-in
        if (account?.provider === 'google' && user.email) {
          const dbUsers = await getUser(user.email);
          if (dbUsers.length > 0) {
            token.id = dbUsers[0].id;
            token.type = 'regular';
          }
        } else {
          // For credentials users
          token.id = user.id as string;
          token.type = user.type;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.type = token.type;
      }

      return session;
    },
  },
});
