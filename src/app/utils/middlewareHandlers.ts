import { NextRequest, NextResponse } from "next/server";
import { i18n } from "../../../i18n-config";
import { getLocale } from "./middlewareHelpers";

export interface RequestHandler {
  (request: NextRequest): Promise<NextResponse | void>;
}

export const missingLocaleHandler: RequestHandler = async (request) => {
  const { pathname, search } = request.nextUrl;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  console.log({pathnameIsMissingLocale})

  if (pathnameIsMissingLocale) {
    const reqHeaderNextUrl = request.headers.get('Referer') || request.headers.get('Next-Url');
    let nextUrlLocale: string | null = null;
    if (typeof reqHeaderNextUrl === 'string') {
      const nextUrlHasLocale = i18n.locales.find((locale) => `${reqHeaderNextUrl}/`.includes(`/${locale}/`));
      nextUrlLocale = nextUrlHasLocale ?? null;
    }
    const locale = nextUrlLocale || getLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? pathname : `/${pathname}`}${search}`, request.url)
    );
    response.headers.set('Content-Encoding', 'gzip,br,deflate,compress');
    return response;
  }

  return;
};
