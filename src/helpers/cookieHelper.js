import cookie from "vue-cookies";

const SESSION_COOKIE_NAME = "common_token";

const defaultParams = {
	expires: "8h"
};

export default {
	deleteSessionCookie() {
		const date = new Date();
		cookie.set(SESSION_COOKIE_NAME, "", {
			expires: date.getDate() - 10
		});
		cookie.remove(SESSION_COOKIE_NAME);
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
