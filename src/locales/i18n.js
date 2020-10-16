import Vue from "vue";
import VueI18n from "vue-i18n";
import english from "./en/index";

const localization = {
	en: english
};

Vue.use(VueI18n);

const i18n = new VueI18n({
	locale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
	messages: localization
});

export default i18n;
