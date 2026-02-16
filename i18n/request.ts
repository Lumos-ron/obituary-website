import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "en" | "de" | "ja")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/common.json`)).default,
      home: (await import(`../messages/${locale}/home.json`)).default,
      create: (await import(`../messages/${locale}/create.json`)).default,
      templates: (await import(`../messages/${locale}/templates.json`)).default,
      guides: (await import(`../messages/${locale}/guides.json`)).default,
      editor: (await import(`../messages/${locale}/editor.json`)).default,
      preview: (await import(`../messages/${locale}/preview.json`)).default,
      about: (await import(`../messages/${locale}/about.json`)).default,
      privacy: (await import(`../messages/${locale}/privacy.json`)).default,
      terms: (await import(`../messages/${locale}/terms.json`)).default,
      metadata: (await import(`../messages/${locale}/metadata.json`)).default,
      enums: (await import(`../messages/${locale}/enums.json`)).default,
    },
  };
});
