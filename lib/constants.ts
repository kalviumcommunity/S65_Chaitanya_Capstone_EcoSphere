export const isProductionEnvironment = process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = process.env.NODE_ENV === 'development';
export const isTestEnvironment = Boolean(
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
    process.env.PLAYWRIGHT ||
    process.env.CI_PLAYWRIGHT,
);

export const guestRegex = /^guest-\d+$/;

// Lazy-loaded DUMMY_PASSWORD to avoid import-time errors in serverless environment
let _DUMMY_PASSWORD: string | null = null;

export function getDummyPassword(): string {
  if (!_DUMMY_PASSWORD) {
    try {
      const { generateDummyPassword } = require('./db/utils');
      _DUMMY_PASSWORD = generateDummyPassword();
    } catch (error) {
      // Fallback password if bcryptjs fails in serverless environment
      _DUMMY_PASSWORD = '$2a$10$fallbackDummyPasswordHashForServerless123456789';
      console.warn('Failed to generate dummy password, using fallback:', error);
    }
  }
  return _DUMMY_PASSWORD as string; // Type assertion since we always set it above
}

// Keep backward compatibility
export const DUMMY_PASSWORD = getDummyPassword();
