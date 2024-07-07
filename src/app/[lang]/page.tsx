import { IHomePage } from "@/models/IDictionary/IHomePage";
import { Locale } from "../../../i18n-config";
import getLocalizedData from "@/services/getLocalizedData";


export default async function Page({ params: { lang } }: { params: { lang: Locale } }) {
  const { test } = await getLocalizedData<IHomePage>(lang, 'homePage');

  return (
    <main>
      homePage : {test}
    </main>
  );
}
