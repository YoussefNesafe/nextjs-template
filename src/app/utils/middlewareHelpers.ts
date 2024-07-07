import { NextRequest } from "next/server";
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { i18n } from "../../../i18n-config";

export const getLocale = (request: NextRequest): string | undefined => {
  
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  // @ts-ignore
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  // Use negotiator and intl-localematcher to get best locale
  try {
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
    const matchedLocale = matchLocale(languages, i18n.locales , i18n.defaultLocale);
    return matchedLocale;
  } catch (e) {
    console.error(e);
    return i18n.defaultLocale;
  }
};