import { Locale } from "../../../i18n-config";


export default function getObjByPath<T>(baseObj: { [key: string]: any }, pathToKey: string, lang: Locale) {
  const result = pathToKey.split('.').reduce((map, cv) => {
    const data = map[cv];
    if (typeof data === 'undefined')
      throw new Error(`invalid path given ( ${pathToKey} ), break at level "${cv}" for lang "${lang}"`);
    return data;
  }, baseObj);
  return result as T;
}
