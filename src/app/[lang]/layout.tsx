import { Plus_Jakarta_Sans } from "next/font/google";
import "../../styles/tailwind.scss";
import { i18n, Locale } from "../../../i18n-config";
import { getDictionaries, setDictionaries } from "@/get-dictionary";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata = {
  manifest: '/manifest.json',
  themeColor: '#FFFFFF',
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}


export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  setDictionaries(getDictionaries());
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        {children}
      </body>
    </html>
  );
}
