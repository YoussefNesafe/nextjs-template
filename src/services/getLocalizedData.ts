import { getDictionary } from "@/get-dictionary";
import { Locale } from "../../i18n-config";
import getObjByPath from "@/app/utils/getObjByPath";




export default async function getLocalizedData<T>(
  locale: Locale,
  pathToKey: string
) {
  const validLocale =  Object.values(Locale).includes(locale);
  if (!validLocale) locale = Locale.en;
  const dictionary = await  getDictionary(locale as Locale);
  if (!dictionary) throw new Error(`unable to find "${locale}" dictionary`);
  return getObjByPath<T>(dictionary, pathToKey, locale);
}
