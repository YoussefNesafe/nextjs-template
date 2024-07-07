import 'server-only';
import { IDictionary } from './models/IDictionary';
import { Locale } from '../i18n-config';


export const getDictionaries = async () => {
 
  const locales = Object.values(Locale);

  const isProd = false;
  const getDictionariesLocally = async () => {
    const promises = locales.map((l) => import(`./dictionaries/${l}.json`).then((x) => x.default));
    const files = await Promise.all(promises);
    const result = files.reduce(
      (map, cv, i) => ({
        ...map,
        [locales[i]]: () => cv,
      }),
      {} as { [lang in Locale]: IDictionary }
    );
    return result;
  };
  return getDictionariesLocally();
};

let dictionaries: Promise<{ [locale: string]: () => IDictionary }> = getDictionaries();

export const setDictionaries = (dic: Promise<{ [locale: string]: () => IDictionary }>) => {
  dictionaries = dic;
};

export const getDictionary = async (locale: Locale) => {
  const dictionary: IDictionary = await dictionaries.then((d) => d[locale]());
  return dictionary;
};
