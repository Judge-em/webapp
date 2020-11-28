import cookie from "vue-cookies";

const SESSION_COOKIE_NAME = "common_token";
const APP_DOMAIN =
	process.env.VUE_APP_NODE_ENV === "prod" ? "judge-em.github.io" : "";

const defaultParams = {
	expires: "2h"
};

export default {
	deleteSessionCookie() {
		cookie.remove(SESSION_COOKIE_NAME, "/webapp", APP_DOMAIN);
	},
	hasSessionCookie() {
		return !!cookie.get(SESSION_COOKIE_NAME);
	},
	setSessionCookie(token) {
		cookie.set(
			SESSION_COOKIE_NAME,
			token,
			defaultParams.expires,
			// "/webapp",
			APP_DOMAIN
		);
	},
	getSessionCookie() {
		return cookie.get(SESSION_COOKIE_NAME);
	}
};
