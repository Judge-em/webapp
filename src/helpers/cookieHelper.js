import cookie from "vue-cookies";

const SESSION_COOKIE_NAME = "common_token";

const defaultParams = {
	expires: "2h"
};

export default {
	deleteSessionCookie() {
		cookie.remove(SESSION_COOKIE_NAME, "/webapp", "judge-em.github.io");
	},
	hasSessionCookie() {
		return !!cookie.get(SESSION_COOKIE_NAME);
	},
	setSessionCookie(token) {
		cookie.set(
			SESSION_COOKIE_NAME,
			token,
			defaultParams.expires,
			"/webapp",
			"judge-em.github.io"
		);
	},
	getSessionCookie() {
		return cookie.get(SESSION_COOKIE_NAME);
	}
};
