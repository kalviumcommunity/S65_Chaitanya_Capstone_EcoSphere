import type { UserType } from '@/app/(auth)/auth';
import type { ChatModel } from './models';

interface Entitlements {
  maxMessagesPerDay: number;
  availableChatModelIds: Array<ChatModel['id']>;
}

export const entitlementsByUserType: Record<UserType, Entitlements> = {
  /*
   * For users without an account
   */
  guest: {
    maxMessagesPerDay:1, 
    availableChatModelIds: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  },

  /*
   * For users with an account
   */
  regular: {
    maxMessagesPerDay: 100,
    availableChatModelIds: ['gemini-2.5-flash', 'gemini-2.5-pro'],
  },

  /*
   * TODO: For users with an account and a paid membership
   */
}; 
