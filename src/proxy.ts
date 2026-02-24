import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const authToken = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    // If user is logged in and trying to access login page, redirect to home
    if (authToken && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If user is NOT logged in and trying to access protected routes
    const protectedRoutes = ['/students'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!authToken && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ['/students/:path*', '/login'],
};
