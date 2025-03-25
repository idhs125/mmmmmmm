import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Remove the redirect that was blocking access to admin pages
  // This allows access to all admin pages including login and dashboard
  return NextResponse.next();
}

// Configure paths that should be matched by the middleware
export const config = {
  matcher: ['/admin/:path*'],
};
