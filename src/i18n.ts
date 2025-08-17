import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptbr from "./languages/ptbr.json";
import en from "./languages/en.json";
    
const language = localStorage.getItem("Language") || "br";
i18n
    .use(initReactI18next)
    .init({
        fallbackLng:language,
        lng: language,
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        detection:{
            order: ["localStorage", "cookie", "navigator"],
            caches: ["localStorage"],
        },
        resources: {
            br: { home:ptbr},
            en: { home:en},
        },
    })

    export default i18n;