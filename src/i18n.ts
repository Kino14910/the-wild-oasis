import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { DateTime } from 'luxon';
import { initReactI18next } from 'react-i18next';

// 1. 直接导入翻译文件 (假设你放在了 src/locales 下)
import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    lng: 'zh',
    // 2. 将导入的资源直接放入 resources
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },

    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

i18n.services.formatter?.add('DATE_HUGE', (value, lng) => {
  return DateTime.fromJSDate(value)
    .setLocale(lng || 'en')
    .toLocaleString(DateTime.DATE_HUGE);
});

export default i18n;