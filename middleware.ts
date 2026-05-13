import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Since we are using localStorage for session, we can't easily check it in middleware 
  // without cookies. In a real app, we'd use cookies or a session token.
  // For this simple version, we'll handle protection in the DashboardLayout component
  // using the useUser hook on the client side.
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/analytics/:path*', '/transactions/:path*', '/products/:path*', '/users/:path*', '/notifications/:path*', '/settings/:path*'],
};
