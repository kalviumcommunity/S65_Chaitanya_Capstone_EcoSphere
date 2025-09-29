declare module 'bcryptjs' {
  export function genSaltSync(rounds?: number): string;
  export function hashSync(s: string, salt: string | number): string;
  export function compareSync(s: string, hash: string): boolean;
  export function genSalt(rounds?: number, cb?: (err: Error | null, salt: string) => void): void;
  export function hash(s: string, salt: string | number, cb?: (err: Error | null, hash: string) => void): void;
  export function compare(s: string, hash: string, cb?: (err: Error | null, success: boolean) => void): void;
}
