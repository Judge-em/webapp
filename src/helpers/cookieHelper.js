import cookie from "vue-cookies";
import store from "../store";

const SESSION_COOKIE_NAME = "common_token";
const LANGUAGE_COOKIE_NAME = "common_token";

const defaultParams = {
	expires: "8h"
};

export default {
	getLanguageCookie() {
		const langCookie = cookie.get(LANGUAGE_COOKIE_NAME);
		if (langCookie) {
			return langCookie;
		}
		cookie.set(
			LANGUAGE_COOKIE_NAME,
			store.state.defaultLanguage.locale,
			defaultParams
		);
		return cookie.get(LANGUAGE_COOKIE_NAME);
	},
	setLanguageCookie(newLocale) {
		cookie.set(
			LANGUAGE_COOKIE_NAME,
			newLocale | store.state.defaultLanguage.locale,
			defaultParams
		);
		return cookie.get(LANGUAGE_COOKIE_NAME);
	},
	deleteSessionCookie() {
		const date = new Date();
		cookie.set(SESSION_COOKIE_NAME, "", {
			expires: date.getDate() - 10
		});
		store.state.userToken = null;
		cookie.remove(SESSION_COOKIE_NAME);
	},
	hasSessionCookie() {
		return !!cookie.get(SESSION_COOKIE_NAME);
	},
	updateSessionCookie(token) {
		cookie.set(SESSION_COOKIE_NAME, token, defaultParams);
		store.state.userToken = token;
	},
	getSessionCookie() {
		return cookie.get(SESSION_COOKIE_NAME);
	}
};
