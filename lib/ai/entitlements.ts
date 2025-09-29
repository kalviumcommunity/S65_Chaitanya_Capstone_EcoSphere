import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  // Rate limiting: maximum user-authored messages allowed per 24h (or window)
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    // Guests have the strictest cap
    maxMessagesPerDay:1, 
    availableChatModelIds: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  },

  /*
   * For users with an account
   */
  regular: {
    // Registered users have a higher daily cap
    maxMessagesPerDay: 5,
    availableChatModelIds: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
}; 
