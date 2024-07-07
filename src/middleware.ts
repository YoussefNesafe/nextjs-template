import type { NextRequest } from 'next/server';
import { missingLocaleHandler } from './app/utils/middlewareHandlers';


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (['/manifest.json', '/favicon.ico', '/sw.js'].includes(pathname)) return;
  const response = await missingLocaleHandler(request);
    if (response) {
      response.headers.set('Content-Encoding', 'gzip,br,deflate,compress');
      return response;
    }

}

export const config = {
  // Matcher ignoring `/_next/` and `/api/` and public folder.*\..*
  matcher: [
    '/((?!api|next-api|_next|_next/static|_next/image|favicon.ico|robots.txt|sw\\.js|sw.js|.*\\..*|health|healthz|ping).*)',
  ],
};
