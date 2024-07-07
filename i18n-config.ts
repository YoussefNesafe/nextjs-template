export enum Locale {
  en = 'en',
  ar = 'ar',
  ur = 'ur'
}

const locales = Object.values(Locale);


export const i18n = {
  defaultLocale: Locale.en,
  locales,
} as const;
