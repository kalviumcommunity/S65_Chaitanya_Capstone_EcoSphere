import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? 'set' : 'not set',
      POSTGRES_URL: process.env.POSTGRES_URL ? 'set' : 'not set',
      AUTH_SECRET: process.env.AUTH_SECRET ? 'set' : 'not set',
    },
  });
}

