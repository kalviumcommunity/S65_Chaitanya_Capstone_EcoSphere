import { signIn } from '@/app/(auth)/auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const redirectUrl = searchParams.get('redirectUrl') || '/';

    console.log('Guest auth request:', {
      url: request.url,
      redirectUrl,
      NODE_ENV: process.env.NODE_ENV,
      AUTH_SECRET: process.env.AUTH_SECRET ? 'set' : 'not set',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : 'not set'
    });

    // In development, be more lenient with environment variables
    const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    
    if (!isDevelopment) {
      // Only enforce strict checks in production
      if (!process.env.AUTH_SECRET) {
        console.error('AUTH_SECRET environment variable is not set');
        return NextResponse.json(
          { error: 'Authentication not configured properly' },
          { status: 500 }
        );
      }
      
      if (!process.env.NEXTAUTH_URL) {
        console.error('NEXTAUTH_URL environment variable is not set in production');
        return NextResponse.json(
          { error: 'Authentication URL not configured' },
          { status: 500 }
        );
      }
    }

    // Validate and decode the redirect URL
    let decodedRedirectUrl: string;
    try {
      decodedRedirectUrl = decodeURIComponent(redirectUrl);
      // Parse the URL to extract just the pathname for security
      const parsedUrl = new URL(decodedRedirectUrl);
      decodedRedirectUrl = parsedUrl.pathname;
    } catch {
      // If URL parsing fails, default to root
      decodedRedirectUrl = '/';
    }

    // Use NextAuth's signIn function directly for guest authentication
    const result = await signIn('guest', { 
      redirect: false, // Don't auto-redirect, we'll handle it
      redirectTo: decodedRedirectUrl 
    });

    // If signIn was successful, redirect to the intended URL
    if (result?.url) {
      return NextResponse.redirect(result.url);
    }

    // Fallback redirect to the decoded URL or root
    const baseUrl = new URL(request.url).origin;
    return NextResponse.redirect(`${baseUrl}${decodedRedirectUrl}`);
    
  } catch (error) {
    console.error('Guest authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
